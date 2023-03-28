import { DateTime } from "@metaplex-foundation/js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Keypair, TransactionInstruction } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { ListingSource, RemintingStatus } from "../enums/collections.enums";
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

export interface IListingValue {
  image: string;
  price: number;
  soruce: ListingSource;
}

export interface IGraphData {
  smallestPrice: number;
  largestPrice: number;
  months: string[];
  prices: number[];
}

export interface IRemintConfig {
  privateMintFee: number | null;
  mintPrice: number;
  collection: PublicKey;
  authority: PublicKey;
  privateMintEnd: DateTime;
  mintCurrency?: PublicKey;
  candyMachine: PublicKey;
  sellerFeeBps: number;
  decimals: number;
}
