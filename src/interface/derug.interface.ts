import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Keypair, TransactionInstruction } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { RemintingStatus } from "../enums/collections.enums";
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
  partialSigner?: Keypair[];
  remintingNft?: IDerugCollectionNft;
}

export interface IDerugCollectionNft {
  mint: PublicKey;
  metadata: Metadata;
  tokenAccount: PublicKey;
  remintingStatus?: RemintingStatus;
}
