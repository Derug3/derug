import { Box, Button, Heading } from "@primer/react";
import {
  ICollectionDerugData,
  ICollectionStats,
} from "../../interface/collections.interface";
import { AiOutlineStar, AiOutlinePlusSquare } from "react-icons/ai";
import tensorLogo from "../../assets/tensorLogo.png";
import magicEdenLogo from "../../assets/magicEdenLogo.png";
import HeadingItem from "./HeadingItem";
import { FC } from "react";
import { DerugStatus } from "../../enums/collections.enums";
import { WalletContextState } from "@solana/wallet-adapter-react";
import dayjs from "dayjs";

export const StickyHeader: FC<{
  openDerugModal: (value: boolean) => void;
  collection?: ICollectionStats;
  collectionDerug?: ICollectionDerugData;
  wallet: WalletContextState;
}> = ({ openDerugModal, collection, collectionDerug, wallet }) => (
  <div
    className="flex w-full self-start bg-gradient-to-r 
  font-mono text-gray-700 leading-6 justify-between px-10 py-2 border-none mb-10"
  >
    <Box className="flex flex-row gap-10">
      <HeadingItem
        amount={collection?.fp}
        descColor="#2dd4bf"
        title="FLOOR PRICE"
        desc="SOL"
      />
      <HeadingItem
        title="LISTED"
        descColor="#2dd4bf"
        desc="NFTs"
        amount={collection?.numListed}
      />
      <HeadingItem
        descColor="#2dd4bf"
        title="MARKET CAP"
        amount={collection?.marketCap}
        desc="SOL"
      />

      <HeadingItem
        descColor="#2dd4bf"
        title="TOTAL SUPPLY"
        desc="NFTs"
        amount={collection?.numMints}
      />
      <HeadingItem
        descColor="#2dd4bf"
        title="FIRST LISTING"
        amount={collection?.firstListed.toDateString().slice(0, 10)}
        desc=""
      />
      {collectionDerug && (
        <Box className="flex flex-row gap-5">
          <HeadingItem
            descColor="#2dd4bf"
            title="STATUS"
            amount={
              collectionDerug.status[0].toUpperCase() +
              collectionDerug.status.slice(1)
            }
            desc=""
          />
          <HeadingItem
            descColor="#2dd4bf"
            title="TOTAL REQUESTS"
            amount={collectionDerug.totalSuggestionCount}
            desc=""
          />
          <HeadingItem
            descColor="#2dd4bf"
            title="REMAINING TIME"
            amount={collectionDerug.createdAt}
            isCounter
            desc=""
          />
          {collectionDerug.status === DerugStatus.Reminting && (
            <HeadingItem
              descColor="#2dd4bf"
              title="TOTAL REMINTED"
              amount={collectionDerug.totalReminted}
              desc=""
            />
          )}
        </Box>
      )}
    </Box>
    <Box className="flex flex-row gap-3 items-center">
      {wallet && (
        <div className="flex align-center">
          <div
            className="cursor-pointer font-mono border-y-4  text-white leading-6 text-lg py-2 border-none"
            onClick={() => openDerugModal(true)}
            style={{
              filter: "drop-shadow(#2dd4bf 0px 0px 15px)",
              backgroundColor: "rgba(0,183,234,15px)",
              fontFamily: "monospace",
            }}
          >
            {" "}
            Add derug request
          </div>
        </div>
      )}
      <AiOutlineStar className="text-4xl cursor-pointer" />
      <img
        src={tensorLogo}
        alt="tensorLogo"
        className="w-8 h-8 rounded-full cursor-pointer"
      />
      <img
        src={magicEdenLogo}
        alt="magicEden"
        className="w-8 h-8 rounded-full cursor-pointer"
      />
    </Box>
  </div>
);
