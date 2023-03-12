import { SystemProgram, TransactionInstruction } from "@solana/web3.js";
import {
  IChainCollectionData,
  INftListing,
} from "../../interface/collections.interface";
import { PublicKey } from "@solana/web3.js";
import { derugDataSeed, metadataSeed } from "../seeds";
import { derugProgramFactory } from "../utilities";
import { AnchorWallet, WalletContextState } from "@solana/wallet-adapter-react";
import {
  MAINNET_RPC_CONNECTION,
  METAPLEX_PROGRAM,
  RPC_CONNECTION,
} from "../../utilities/utilities";
import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import {
  IDerugInstruction,
  IUtilityData,
} from "../../interface/derug.interface";
import { mapUtilityAction } from "../helpers";
import { sendTransaction } from "../sendTransaction";

export const createDerugDataIx = async (
  collection: IChainCollectionData,
  wallet: WalletContextState,
  listedNfts?: INftListing
) => {
  const derugProgram = derugProgramFactory();
  const collectionKey = new PublicKey(collection.collectionMint);

  const collectionAccountInf = await MAINNET_RPC_CONNECTION.getAccountInfo(
    collectionKey
  );

  let collectionMetadata: PublicKey | undefined;
  let mintKey: PublicKey | undefined;

  if (collectionAccountInf?.owner.toString() === TOKEN_PROGRAM_ID.toString()) {
    mintKey = collectionKey;
  } else {
    mintKey = new PublicKey(listedNfts?.mint!);
  }

  [collectionMetadata] = PublicKey.findProgramAddressSync(
    [metadataSeed, METAPLEX_PROGRAM.toBuffer(), mintKey.toBuffer()],
    METAPLEX_PROGRAM
  );

  const ix = await derugProgram.methods
    .initializeDerug(collection.totalSupply)
    .accounts({
      collectionKey,
      derugData: collection.derugDataAddress,
      payer: wallet.publicKey!,
      collectionMetadata,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  return ix;
};

export const createOrUpdateDerugRequest = async (
  name: string,
  wallet: WalletContextState,
  utilities: IUtilityData[],
  collection: IChainCollectionData,
  listedNft?: INftListing
) => {
  const instructions: TransactionInstruction[] = [];

  const derugProgram = derugProgramFactory();

  if (!collection.hasActiveDerugData) {
    instructions.push(await createDerugDataIx(collection, wallet, listedNft));
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
};
