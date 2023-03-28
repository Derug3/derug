import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  AccountMeta,
  ComputeBudgetProgram,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import {
  IChainCollectionData,
  ICollectionDerugData,
  IRequest,
} from "../../interface/collections.interface";
import { METAPLEX_PROGRAM, RPC_CONNECTION } from "../../utilities/utilities";
import {
  authoritySeed,
  candyMachineSeed,
  collectionAuthoritySeed,
  derugDataSeed,
  editionSeed,
  metadataSeed,
  remintConfigSeed,
} from "../seeds";
import { sendTransaction } from "../sendTransaction";
import {
  candyMachineProgramId,
  derugProgramFactory,
  feeWallet,
} from "../utilities";
import {
  AccountLayout,
  getMinimumBalanceForRentExemptAccount,
  getMinimumBalanceForRentExemptMint,
  MintLayout,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  IDerugCollectionNft,
  IDerugInstruction,
  IRemintConfig,
} from "../../interface/derug.interface";
import { saveCandyMachineData, storeAllNfts } from "../../api/public-mint.api";
import { candyMachineProgram } from "@metaplex-foundation/js";
import toast from "react-hot-toast";

export const claimVictory = async (
  wallet: WalletContextState,
  derug: ICollectionDerugData,
  chainCollectionData: IChainCollectionData,
  remintConfig: IRemintConfig,
  request: IRequest
) => {
  const derugProgram = derugProgramFactory();
  const instructions: IDerugInstruction[] = [];

  const remainingAccounts: AccountMeta[] = [];

  if (request.publicMint) {
    try {
      const candyMachine = Keypair.generate();
      await saveCandyMachineData({
        candyMachineKey: candyMachine.publicKey.toString(),
        candyMachineSecretKey: JSON.stringify(candyMachine.secretKey),
        derugData: derug.address.toString(),
      });
      await storeAllNfts(
        chainCollectionData.rugUpdateAuthority.toString(),
        derug.address.toString()
      );
      remainingAccounts.push({
        isSigner: false,
        isWritable: false,
        pubkey: candyMachine.publicKey,
      });
      const [candyMachineCreator] = PublicKey.findProgramAddressSync(
        [candyMachineSeed, candyMachine.publicKey.toBuffer()],
        candyMachineProgramId
      );
      remainingAccounts.push({
        isSigner: false,
        isWritable: false,
        pubkey: candyMachineCreator,
      });
      if (remintConfig.mintCurrency) {
        remainingAccounts.push({
          isSigner: false,
          isWritable: false,
          pubkey: remintConfig.mintCurrency,
        });
      }
    } catch (error: any) {
      toast.error(
        "Failed to get all necessary data for Candy Machine:",
        error.message
      );
      return;
    }
  }

  const claimVictoryIx = await derugProgram.methods
    .claimVictory()
    .accounts({
      derugData: derug.address,
      derugRequest: request.address,
      payer: wallet.publicKey!,
      remintConfig: remintConfig.address,
      feeWallet: feeWallet,
      systemProgram: SystemProgram.programId,
    })
    .remainingAccounts(remainingAccounts)
    .instruction();

  const tokenAccount = Keypair.generate();
  const collection = Keypair.generate();

  const createTokenAcc = SystemProgram.createAccount({
    fromPubkey: wallet.publicKey!,
    lamports: await getMinimumBalanceForRentExemptAccount(RPC_CONNECTION),
    newAccountPubkey: tokenAccount.publicKey,
    programId: TOKEN_PROGRAM_ID,
    space: AccountLayout.span,
  });

  const createMint = SystemProgram.createAccount({
    fromPubkey: wallet.publicKey!,
    lamports: await getMinimumBalanceForRentExemptMint(RPC_CONNECTION),
    newAccountPubkey: collection.publicKey,
    programId: TOKEN_PROGRAM_ID,
    space: MintLayout.span,
  });

  const [pdaAuthority] = PublicKey.findProgramAddressSync(
    [derugDataSeed, request.address.toBuffer(), authoritySeed],
    derugProgram.programId
  );

  const [collectionAuthority] = PublicKey.findProgramAddressSync(
    [
      metadataSeed,
      METAPLEX_PROGRAM.toBuffer(),
      collection.publicKey.toBuffer(),
      collectionAuthoritySeed,
      pdaAuthority.toBuffer(),
    ],
    METAPLEX_PROGRAM
  );

  const [collectionMetadata] = PublicKey.findProgramAddressSync(
    [
      metadataSeed,
      METAPLEX_PROGRAM.toBuffer(),
      collection.publicKey.toBuffer(),
    ],
    METAPLEX_PROGRAM
  );

  const [collectionMasterEdition] = PublicKey.findProgramAddressSync(
    [
      metadataSeed,
      METAPLEX_PROGRAM.toBuffer(),
      collection.publicKey.toBuffer(),
      editionSeed,
    ],
    METAPLEX_PROGRAM
  );

  const initRemintingIx = await derugProgram.methods
    .initializeReminting()
    .accounts({
      derugData: derug.address,
      derugRequest: request.address,
      payer: wallet.publicKey!,
      pdaAuthority,
      remintConfig: remintConfig.address,
      feeWallet: feeWallet,
      collectionAuthorityRecord: collectionAuthority,
      newCollection: collection.publicKey,
      tokenAccount: tokenAccount.publicKey,
      metadataAccount: collectionMetadata,
      masterEdition: collectionMasterEdition,
      metadataProgram: METAPLEX_PROGRAM,
      rent: SYSVAR_RENT_PUBKEY,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .instruction();

  instructions.push({
    instructions: [claimVictoryIx, createTokenAcc, createMint, initRemintingIx],
    pendingDescription: "Initializing reminting and claiming victory",
    successDescription: "Successfully initialized reminting",
    partialSigner: [tokenAccount, collection],
  });

  await sendTransaction(RPC_CONNECTION, instructions, wallet);
};

export const remintNft = async (
  wallet: WalletContextState,
  derugData: ICollectionDerugData,
  request: IRequest,
  nfts: IDerugCollectionNft[]
) => {
  const instructions: IDerugInstruction[] = [];
  const derugProgram = derugProgramFactory();

  const [remintConfig] = PublicKey.findProgramAddressSync(
    [remintConfigSeed, derugData.address.toBuffer()],
    derugProgram.programId
  );

  for (const nft of nfts) {
    const tokenAccount = Keypair.generate();
    const mint = Keypair.generate();
    const [oldMetadata] = PublicKey.findProgramAddressSync(
      [metadataSeed, METAPLEX_PROGRAM.toBuffer(), nft.mint.toBuffer()],
      METAPLEX_PROGRAM
    );

    const [newMasterEdition] = PublicKey.findProgramAddressSync(
      [
        metadataSeed,
        METAPLEX_PROGRAM.toBuffer(),
        mint.publicKey.toBuffer(),
        editionSeed,
      ],
      METAPLEX_PROGRAM
    );

    const [newMetadata] = PublicKey.findProgramAddressSync(
      [metadataSeed, METAPLEX_PROGRAM.toBuffer(), mint.publicKey.toBuffer()],
      METAPLEX_PROGRAM
    );

    const [oldMasterEdition] = PublicKey.findProgramAddressSync(
      [
        metadataSeed,
        METAPLEX_PROGRAM.toBuffer(),
        nft.mint.toBuffer(),
        editionSeed,
      ],
      METAPLEX_PROGRAM
    );

    const [pdaAuthority] = PublicKey.findProgramAddressSync(
      [derugDataSeed, request.address.toBuffer(), authoritySeed],
      derugProgram.programId
    );

    const createTokenAcc = SystemProgram.createAccount({
      fromPubkey: wallet.publicKey!,
      lamports: await getMinimumBalanceForRentExemptAccount(RPC_CONNECTION),
      newAccountPubkey: tokenAccount.publicKey,
      programId: TOKEN_PROGRAM_ID,
      space: AccountLayout.span,
    });

    const createMint = SystemProgram.createAccount({
      fromPubkey: wallet.publicKey!,
      lamports: await getMinimumBalanceForRentExemptMint(RPC_CONNECTION),
      newAccountPubkey: mint.publicKey,
      programId: TOKEN_PROGRAM_ID,
      space: MintLayout.span,
    });

    const remainingAccounts: AccountMeta[] = [];

    if (derugData.collectionMetadata) {
      remainingAccounts.push({
        isSigner: false,
        isWritable: true,
        pubkey: derugData.collectionMetadata,
      });
    }

    const remintNftIx = await derugProgram.methods
      .remintNft()
      .accounts({
        derugData: derugData.address,
        derugRequest: request.address,
        oldEdition: oldMasterEdition,
        oldMetadata: oldMetadata,
        newMint: mint.publicKey,
        oldToken: nft.tokenAccount,
        remintConfig,
        newToken: tokenAccount.publicKey,
        payer: wallet.publicKey!,
        oldMint: nft.mint,
        feeWallet: feeWallet,
        pdaAuthority,
        newEdition: newMasterEdition,
        newMetadata: newMetadata,
        oldCollection: derugData.collection,
        newCollection: derugData.newCollection!,
        metadataProgram: METAPLEX_PROGRAM,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .preInstructions([
        ComputeBudgetProgram.setComputeUnitLimit({
          units: 130000000,
        }),
      ])
      .remainingAccounts(remainingAccounts)
      .instruction();

    const [collectionMetadata] = PublicKey.findProgramAddressSync(
      [
        metadataSeed,
        METAPLEX_PROGRAM.toBuffer(),
        derugData.newCollection!.toBuffer(),
      ],
      METAPLEX_PROGRAM
    );

    const [collectionMasterEdition] = PublicKey.findProgramAddressSync(
      [
        metadataSeed,
        METAPLEX_PROGRAM.toBuffer(),
        derugData.newCollection!.toBuffer(),
        editionSeed,
      ],
      METAPLEX_PROGRAM
    );

    const [collectionAuthority] = PublicKey.findProgramAddressSync(
      [
        metadataSeed,
        METAPLEX_PROGRAM.toBuffer(),
        derugData.newCollection!.toBuffer(),
        collectionAuthoritySeed,
        pdaAuthority.toBuffer(),
      ],
      METAPLEX_PROGRAM
    );

    const updateVerifyCollection = await derugProgram.methods
      .updateVerifyCollection()
      .accounts({
        collectionAuthority,
        derugData: derugData.address,
        derugger: request.derugger,
        collectionMint: derugData.newCollection!,
        nftMint: mint.publicKey,
        nftMetadata: newMetadata,
        feeWallet: feeWallet,
        systemProgram: SystemProgram.programId,
        pdaAuthority,
        payer: wallet.publicKey!,
        derugRequest: request.address,
        collectionMetadata: collectionMetadata,
        collectionMasterEdition,
        metadataProgram: METAPLEX_PROGRAM,
      })
      .instruction();

    instructions.push({
      instructions: [
        createTokenAcc,
        createMint,
        remintNftIx,
        updateVerifyCollection,
      ],
      pendingDescription: `Reminting ${nft.metadata.data.name}`,
      successDescription: `Successfully reminted ${nft.metadata.data.name}`,
      partialSigner: [tokenAccount, mint],
      remintingNft: nft,
    });
  }
  await sendTransaction(RPC_CONNECTION, instructions, wallet);
};

export async function getRemintConfig(
  derug: PublicKey
): Promise<IRemintConfig | undefined> {
  const derugProgram = derugProgramFactory();
  const [remintConfigAddress] = PublicKey.findProgramAddressSync(
    [remintConfigSeed, derug.toBuffer()],
    derugProgram.programId
  );

  try {
    const remintConfigAccount = await derugProgram.account.remintConfig.fetch(
      remintConfigAddress
    );

    return {
      address: remintConfigAddress,
      authority: remintConfigAccount.authority,
      candyMachine: remintConfigAccount.candyMachineKey,
      candyMachineCreator: remintConfigAccount.candyMachineCreator,
      collection: remintConfigAccount.collection,
      mintCurrency: remintConfigAccount.mintCurrency ?? undefined,
      mintPrice: remintConfigAccount.mintPrice?.toNumber(),
      derugRequest: remintConfigAccount.derugRequest,
      newName: remintConfigAccount.newName,
      newSymbol: remintConfigAccount.newSymbol,
      sellerFeeBps: remintConfigAccount.sellerFeeBps,
      privateMintEnd: remintConfigAccount.privateMintEnd?.toNumber(),
    };
  } catch (error) {
    return undefined;
  }
}
