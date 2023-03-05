export interface ICollectionData {
  symbol: any;
  id: string;
  name: string;
  image: string;
  twitter?: string;
  discord?: string;
  isFlagged: boolean;
  type?: string[];
}

export interface ICollection {
  result: any;
  address: string;
  collection: any;
  collectionDetails: any;
  version: string;
  size: string;
  creators: any[];
  edition: IEdition;
  editionNonce: number;
  isMutable: boolean;
  json: ICollectionJson;
  jsonLoaded: boolean;
  metadataAddress: string;
  mint: IMint;
  name: string;
  model: string;
  primarySaleHappened: boolean;
  programmableConfig: null;
  sellerFeeBasisPoints: number;
  symbol: string;
  tokenStandard: number;
  updateAuthorityAddress: string;
  uri: string;
  uses: any;
}

export interface IMint {
  address: string;
  currency: { symbol: string; decimals: number; namespace: string };
  decimals: number;
  freezeAuthorityAddress: string;
  isWrappedSol: boolean;
  mintAuthorityAddress: string;
  model: string;
}

interface IEdition {
  address: string;
  model: string;
  isOriginal: boolean;
  supply: string;
  maxSupply: null;
}

export interface ICollectionJson {
  attributes?: ITrait[];
  collection: ICollectionInfo;
  description: string;
  image: string;
  name: string;
  properties: any;
  category: "image";
  files: any[];
  creators: any[];
  seller_fee_basis_points: number;
  symbol: string;
}

export interface ITrait {
  trait_type: string;
  value: string;
  max_value: number;
}

export interface ICollectionInfo {
  family: string;
  name: string;
}
