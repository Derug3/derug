import { create } from "zustand";
import { ICollectionData } from "../interface/collections.interface";

export interface ICollectionsStore {
  collections: ICollectionData[];
  setCollections: (collections: ICollectionData[]) => void;
}

const initialState = {
  collections: [],
};

export const collectionsStore = create<ICollectionsStore>((set, get) => ({
  ...initialState,
  setCollections: (collections) => set({ collections: collections }),
}));
