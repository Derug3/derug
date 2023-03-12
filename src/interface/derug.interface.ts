import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { TransactionInstruction } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
export interface IUtilityData {
  title: string;
  description: string;
  action: UtilityAction;
}

export enum UtilityAction {
  Add,
  Remove,
}

export interface IDerugInstruction {
  instructions: TransactionInstruction[];
  pendingDescription: string;
  successDescription: string;
}

export interface IDerugCollectionNft {
  mint: PublicKey;
  metadataAddress: PublicKey;
  metadata: Metadata;
  tokenAccount: PublicKey;
}
