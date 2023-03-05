import React from "react";
import { ICollectionData } from "../interface/collections.interface";

export interface ICollectionsStore {
  collections: ICollectionData[] | undefined;
  setCollections: (collections: ICollectionData[]) => void;
}

export const CollectionsContext = React.createContext({} as ICollectionsStore);
