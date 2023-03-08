import { Box, Button, Heading } from "@primer/react";
import { ICollectionStats } from "../../interface/collections.interface";
import { AiOutlineStar, AiOutlinePlusSquare } from "react-icons/ai";
import tensorLogo from "../../assets/tensorLogo.png";
import magicEdenLogo from "../../assets/magicEdenLogo.png";
import HeadingItem from "./HeadingItem";
import { FC } from "react";

export const StickyHeader: FC<{
  openDerugModal: (value: boolean) => void;
  collection?: ICollectionStats;
}> = ({ openDerugModal, collection }) => (
  <div
    className="flex w-full self-start bg-gradient-to-r 
  font-mono text-gray-700 leading-6 justify-between px-10 py-2 border-none mb-10"
  >
    <Box className="flex flex-row gap-10">
      <HeadingItem
        amount={collection?.fp}
        descColor="green"
        title="FLOOR PRICE"
        desc="SOL"
      />
      <HeadingItem
        title="LISTED"
        descColor="red"
        desc="NFTs"
        amount={collection?.numListed}
      />
      <HeadingItem
        descColor="green"
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
        descColor="black"
        title="FIRST LISTING"
        amount={collection?.firstListed.toDateString().slice(0, 10)}
        desc=""
      />
    </Box>
    <Box className="flex flex-row gap-3 items-center">
      <div className="flex align-center">
        <div
          className="cursor-pointer font-mono text-gray-700 leading-6 text-lg py-2 border-none"
          onClick={() => openDerugModal(true)}
          style={{
            filter: "drop-shadow(rgb(246, 242, 9) 0px 0px 10px)",
            backgroundColor: "rgba(0,183,234,15px)",
            fontFamily: "monospace",
          }}
        >
          {" "}
          Add derug request
        </div>
      </div>
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
