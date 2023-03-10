import React from "react";
import {
  IChainCollectionData,
  ICollectionData,
  ICollectionStats,
  INftListing,
  ITrait,
} from "../interface/collections.interface";

export interface CollectionContext {
  collection: ICollectionData | undefined;
  traits: ITrait[] | undefined;
  activeListings: INftListing[] | undefined;
  collectionStats: ICollectionStats | undefined;
  chainCollectionData: IChainCollectionData | undefined;
  setCollection: (collection: ICollectionData) => void;
  setChainCollectionData: (data: IChainCollectionData) => void;
  setTraits: (traits: ITrait[]) => void;
  setActiveListings: (activeListings: INftListing[]) => void;
  setCollectionStats: (stats: ICollectionStats) => void;
}

export const CollectionContext = React.createContext({} as CollectionContext);
