export interface ICollectionData {
  id: string;
  name: string;
  image: string;
  twitter?: string;
  discord?: string;
  isFlagged: boolean;
  type?: string[];
}
