import { Box, Heading } from "@primer/react";
import { ICollectionStats } from "../../interface/collections.interface";
import { AiOutlineStar } from "react-icons/ai";
import tensorLogo from "../../assets/tensorLogo.png";
import magicEdenLogo from "../../assets/magicEdenLogo.png";
import HeadingItem from "./HeadingItem";

export const header = (isFavourite: boolean, collection?: ICollectionStats) => (
  <div
    className="flex w-full self-start bg-gradient-to-r 
  font-mono text-gray-700 leading-6 justify-between px-10 py-2 border-none mb-10"
  >
    <Box className="flex flex-row gap-10">
      <HeadingItem
        amount={collection?.fp}
        descColor="#B3FFAE"
        title="FLOOR PRICE"
        desc="SOL"
      />
      <HeadingItem
        title="LISTED"
        descColor="#FF7D7D"
        desc="NFTs"
        amount={collection?.numListed}
      />
      <HeadingItem
        descColor="#B3FFAE"
        title="MARKET CAP"
        amount={collection?.marketCap}
        desc="SOL"
      />

      <HeadingItem
        descColor="rgb(9, 194, 246)"
        title="TOTAL SUPPLY"
        desc="NFTs"
        amount={collection?.numMints}
      />
      <HeadingItem
        descColor="#F9D923"
        title="FIRST LISTING"
        amount={collection?.firstListed.toDateString().slice(0, 10)}
        desc=""
      />
    </Box>
    <Box className="flex flex-row gap-3 items-center">
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
