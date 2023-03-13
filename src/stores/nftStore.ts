import { PublicKey } from "@solana/web3.js";
import { RemintingStatus } from "../enums/collections.enums";
import { createStore } from "zustand";
export interface INftStore {
  nfts: { mint: PublicKey; status: RemintingStatus }[];
  setNfts: (nfts: { mint: PublicKey; status: RemintingStatus }[]) => void;
}

const initalState = {
  nfts: [],
};

export const nftStore = createStore<INftStore>((set, get) => ({
  ...initalState,
  setNfts: (nfts: { mint: PublicKey; status: RemintingStatus }[]) =>
    set({ nfts: nfts }),
}));
