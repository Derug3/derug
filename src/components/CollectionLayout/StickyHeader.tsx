import { Box, Button, Heading } from "@primer/react";
import {
  ICollectionDerugData,
  ICollectionStats,
} from "../../interface/collections.interface";
import { AiOutlineStar } from "react-icons/ai";
import tensorLogo from "../../assets/tensorLogo.png";
import magicEdenLogo from "../../assets/magicEdenLogo.png";
import HeadingItem from "./HeadingItem";
import { FC, useState } from "react";
import { DerugStatus } from "../../enums/collections.enums";
import { useSearchParams } from "react-router-dom";
import { WalletContextState } from "@solana/wallet-adapter-react";
import dayjs from "dayjs";

export const StickyHeader: FC<{
  collection?: ICollectionStats;
  wallet: WalletContextState;
  openDerugModal: (value: boolean) => void;
  collectionDerug?: ICollectionDerugData;
}> = ({ wallet, collection, collectionDerug, openDerugModal }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const slug = useSearchParams()[0].get("symbol");

  return (
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
          amount={dayjs
            .unix(collection?.firstListed ?? 0)
            .toDate()
            .toDateString()
            .slice(0, 10)}
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
              date={collectionDerug.periodEnd}
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
    </div>
  );
};
