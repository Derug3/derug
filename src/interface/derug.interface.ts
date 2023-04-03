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
  address: PublicKey;
  newName: string;
  newSymbol: string;
  derugRequest: PublicKey;
  mintPrice?: number;
  collection: PublicKey;
  candyMachineCreator: PublicKey;
  authority: PublicKey;
  privateMintEnd?: Date;
  mintCurrency?: PublicKey;
  candyMachine: PublicKey;
  sellerFeeBps: number;
}

export interface CandyMachineDto {
  derugData: string;
  candyMachineKey: string;
  candyMachineSecretKey: string;
}

export interface INonMinted {
  nftMetadata: string;
  derugData: string;
  hasReminted: boolean;
  dateReminted: Date;
  remintAuthority: string;
  name: string;
  uri: string;
  creator: string;
}

export interface ICreator {
  address: PublicKey;
  share: number;
}
