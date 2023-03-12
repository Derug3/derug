import { SystemProgram, TransactionInstruction } from "@solana/web3.js";
import {
  IChainCollectionData,
  ICollectionDerugData,
  ICollectionStats,
  INftListing,
} from "../../interface/collections.interface";
import { PublicKey } from "@solana/web3.js";
import { metadataSeed } from "../seeds";
import { derugProgramFactory } from "../utilities";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { METAPLEX_PROGRAM, RPC_CONNECTION } from "../../utilities/utilities";
import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";

import { DerugStatus } from "../../enums/collections.enums";

export const createDerugDataIx = async (
  collection: IChainCollectionData,
  wallet: WalletContextState,
  collectionStats: ICollectionStats,
  listedNfts?: INftListing
) => {
  const derugProgram = derugProgramFactory();
  const collectionKey = new PublicKey(collection.collectionMint);

  const collectionAccountInf = await RPC_CONNECTION.getAccountInfo(
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
    .initializeDerug(collectionStats.numMints)
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

export const getCollectionDerugData = async (
  derugDataAddress: PublicKey
): Promise<ICollectionDerugData> => {
  try {
    const derugProgram = derugProgramFactory();
    const derugDataAccount = await derugProgram.account.derugData.fetch(
      derugDataAddress
    );

    return {
      collection: derugDataAccount.collection,
      createdAt: derugDataAccount.dateAdded.toNumber(),
      status: Object.keys(derugDataAccount.derugStatus)[0] as DerugStatus,
      totalReminted: derugDataAccount.totalReminted,
      totalSuggestionCount: derugDataAccount.totalSuggestionCount,
      totalSupply: derugDataAccount.totalSupply,
      votingStartedAt: derugDataAccount.votingStartedAt.toNumber(),
      newCollection: derugDataAccount.newCollection,
      winningRequest: derugDataAccount.winningRequest,
      address: derugDataAddress,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
