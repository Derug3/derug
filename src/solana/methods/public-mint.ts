import { sol, toBigNumber, toDateTime, token } from "@metaplex-foundation/js";
import { MintLayout } from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";
import dayjs from "dayjs";
import { ICollectionDerugData } from "../../interface/collections.interface";
import { IRemintConfig } from "../../interface/derug.interface";
import { metaplex } from "../utilities";

export const initializeCandyMachine = async (
  collection: ICollectionDerugData,
  wallet: WalletContextState,
  remintConfig: IRemintConfig
) => {
  await metaplex.candyMachinesV2().create({
    itemsAvailable: toBigNumber(collection.totalSupply),
    price: remintConfig.mintCurrency
      ? token(toBigNumber(remintConfig.mintPrice), remintConfig.decimals)
      : sol(remintConfig.mintPrice),
    sellerFeeBasisPoints: remintConfig.sellerFeeBps,
    tokenMint: remintConfig.mintCurrency ?? null,
    collection: collection.newCollection,
    goLiveDate: remintConfig.privateMintEnd,
    retainAuthority: true,
  });
};
