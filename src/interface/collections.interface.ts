import { ListingSource } from "../enums/collections.enums";

export interface ICollectionData {
  symbol: string;
  id: string;
  name: string;
  image: string;
  twitter?: string;
  discord?: string;
  isFlagged: boolean;
  type?: string[];
  numMints?: number;
}

export interface IRequest {
  title: string;
  utility: IUtility[];
}
export interface IUtility {
  name: string;
  description: string;
}
export interface IListed {
  auctionHouse: string;
  price: number;
  pdaAddresses: string;
  expiry: number;
  seller: string;
  sellerReferal: string;
  tokenAddress: string;
  tokenMint: string;
  tokenSize: number;
  rarity: any;
  extra: IExtra;
}

interface IExtra {
  img: string;
}

export interface ITrait {
  name: string;
  values: ITraitInfo[];
}

export interface ITraitInfo {
  name: string;
  percentage: number;
  image: string;
  fp: number;
  listedCount: number;
}

export interface ICollectionStats {
  fp: number;
  volume24H: number;
  marketCap: number;
  numListed: number;
  numMints: number;
  royalty: number;
  firstListed: Date;
}

export interface INftListing {
  price: number;
  owner: string;
  mint: string;
  soruce: ListingSource;
  imageUrl: string;
  txAt: number;
  name: string;
}

// export interface IListedNft {
//   mint: string;
//   soruce: ListingSource;
//   name: string;
//   imageUrl: string;
//   price: number;
// }
