export interface ICollectionData {
  id: string;
  name: string;
  image: string;
  twitter?: string;
  discord?: string;
  isFlagged: boolean;
  type?: string[];
  numMints?: number;
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
