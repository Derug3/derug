import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  TransactionInstruction,
  PublicKey,
  SystemProgram,
  GetProgramAccountsFilter,
} from "@solana/web3.js";
import {
  IChainCollectionData,
  INftListing,
  IRequest,
} from "../../interface/collections.interface";
import {
  IUtilityData,
  IDerugInstruction,
} from "../../interface/derug.interface";
import { RPC_CONNECTION } from "../../utilities/utilities";
import { mapUtilityAction } from "../helpers";
import { derugDataSeed } from "../seeds";
import { sendTransaction } from "../sendTransaction";
import { derugProgramFactory } from "../utilities";
import { createDerugDataIx } from "./derug";

export const createOrUpdateDerugRequest = async (
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
    createdAt: derugAccount.createdAt.toNumber(),
    derugger: derugAccount.derugger,
    voteCount: derugAccount.voteCount,
    utility: derugAccount.utilityData,
  };
};
