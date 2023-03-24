import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  TransactionInstruction,
  PublicKey,
  SystemProgram,
  GetProgramAccountsFilter,
  AccountMeta,
} from "@solana/web3.js";
import { getSingleCollection } from "../../api/collections.api";
import {
  IChainCollectionData,
  ICollectionData,
  ICollectionDerugData,
  ICollectionStats,
  INftListing,
  IRequest,
} from "../../interface/collections.interface";
import {
  IUtilityData,
  IDerugInstruction,
  IDerugCollectionNft,
} from "../../interface/derug.interface";
import { METAPLEX_PROGRAM, RPC_CONNECTION } from "../../utilities/utilities";
import { mapUtilityAction } from "../helpers";
import { derugDataSeed, metadataSeed, voteRecordSeed } from "../seeds";
import { sendTransaction } from "../sendTransaction";
import { derugProgramFactory, feeWallet } from "../utilities";
import { createDerugDataIx } from "./derug";

export const createOrUpdateDerugRequest = async (
  wallet: WalletContextState,
  utilities: IUtilityData[],
  collection: IChainCollectionData,
  collectionStats: ICollectionStats,
  listedNft?: INftListing
) => {
  const instructions: TransactionInstruction[] = [];

  const derugProgram = derugProgramFactory();

  //TODO:Change mint before mainnet
  if (!collection.hasActiveDerugData) {
    instructions.push(
      await createDerugDataIx(
        collection,
        wallet,
        collectionStats,
        new PublicKey("CCRQEcQmXxN5GDVkMKcgnXaSLv3KeD3Qfp9zEXaBB1Nx")
      )
    );
  }

  const [derugRequest] = PublicKey.findProgramAddressSync(
    [
      derugDataSeed,
      collection.derugDataAddress.toBuffer(),
      wallet.publicKey!.toBuffer(),
    ],
    derugProgram.programId
  );

  const initalizeDerugRequest = await derugProgram.methods
    .createOrUpdateDerugRequest(
      utilities.map((ut) => {
        return { ...ut, action: mapUtilityAction(ut.action) };
      })
    )
    .accounts({
      derugData: collection.derugDataAddress,
      derugRequest,
      feeWallet: feeWallet,
      payer: wallet.publicKey!,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  instructions.push(initalizeDerugRequest);

  const derugInstruction: IDerugInstruction = {
    instructions,
    pendingDescription: "Creating derug request",
    successDescription: "Successfully created derug request!",
  };

  await sendTransaction(RPC_CONNECTION, [derugInstruction], wallet);

  return derugRequest;
};

export const getAllDerugRequest = async (
  derugDataAddress: PublicKey
): Promise<IRequest[]> => {
  try {
    const filters: GetProgramAccountsFilter = {
      memcmp: {
        offset: 8,
        bytes: derugDataAddress.toBase58(),
      },
    };

    const derugProgram = derugProgramFactory();

    const allRequestsForCollection =
      await derugProgram.account.derugRequest.all([filters]);

    const requests: IRequest[] = [];

    for (const derug of allRequestsForCollection) {
      requests.push({
        createdAt: derug.account.createdAt.toNumber(),
        derugger: derug.account.derugger,
        voteCount: derug.account.voteCount,
        utility: derug.account.utilityData,
        address: derug.publicKey,
      });
    }

    return requests;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSingleDerugRequest = async (
  derugRequestAddress: PublicKey
): Promise<IRequest> => {
  const derugProgram = derugProgramFactory();

  const derugAccount = await derugProgram.account.derugRequest.fetch(
    derugRequestAddress
  );

  return {
    address: derugRequestAddress,
    createdAt: derugAccount.createdAt.toNumber(),
    derugger: derugAccount.derugger,
    voteCount: derugAccount.voteCount,
    utility: derugAccount.utilityData,
  };
};

export const getAllActiveCollections = async (): Promise<ICollectionData[]> => {
  const derugProgram = derugProgramFactory();

  const derugAccount = await derugProgram.account.derugData.all();
  const collections: ICollectionData[] = [];

  for (const da of derugAccount) {
    try {
      const request = await getSingleCollection(da.account.slug);
      collections.push(request);
    } catch (error) {
      console.log(error);
    }
  }
  return collections;
};

export const castDerugRequestVote = async (
  derugRequest: IRequest,
  wallet: WalletContextState,
  collectionDerug: ICollectionDerugData,
  derugNfts: IDerugCollectionNft[]
) => {
  const derugProgram = derugProgramFactory();
  const derugInstructions: IDerugInstruction[] = [];

  for (const derugNft of derugNfts) {
    const remainingAccounts: AccountMeta[] = [];
    console.log(derugNft);

    const [voteRecordPda] = PublicKey.findProgramAddressSync(
      [derugDataSeed, derugNft.mint.toBuffer(), voteRecordSeed],
      derugProgram.programId
    );

    const [metadataAddr] = PublicKey.findProgramAddressSync(
      [metadataSeed, METAPLEX_PROGRAM.toBuffer(), derugNft.mint.toBuffer()],
      METAPLEX_PROGRAM
    );

    remainingAccounts.push({
      isSigner: false,
      isWritable: true,
      pubkey: voteRecordPda,
    });

    remainingAccounts.push({
      isSigner: false,
      isWritable: false,
      pubkey: derugNft.mint,
    });
    remainingAccounts.push({
      isSigner: false,
      isWritable: false,
      pubkey: metadataAddr,
    });
    remainingAccounts.push({
      isSigner: false,
      isWritable: false,
      pubkey: derugNft.tokenAccount,
    });

    const castVoteIx = await derugProgram.methods
      .vote()
      .accounts({
        derugData: collectionDerug.address,
        payer: wallet.publicKey!,
        derugRequest: derugRequest.address,
        feeWallet: feeWallet,
        systemProgram: SystemProgram.programId,
      })
      .remainingAccounts(remainingAccounts)
      .instruction();

    derugInstructions.push({
      instructions: [castVoteIx],
      pendingDescription: "Casting vote...",
      successDescription: "Successfully voted",
    });
  }
  await sendTransaction(RPC_CONNECTION, derugInstructions, wallet);
};
