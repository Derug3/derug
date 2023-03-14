import { Box, Text } from "@primer/react";
import { motion } from "framer-motion";
import { FC, useMemo } from "react";
import {
  IChainCollectionData,
  IListed,
  ITrait,
} from "../../interface/collections.interface";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";
import ListedNfts from "../ListedNfts/ListedNfts";
import ListingsGraph from "../ListingsGraph/ListingsGraph";
import TraitsList from "../Traits/TraitsList";

export const RightPane: FC<{
  selectedData: string;
  chainCollectionData?: IChainCollectionData;
  traits: ITrait[] | undefined;
  iframeRef: any;
  parentRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ selectedData, traits, iframeRef, parentRef, chainCollectionData }) => (
  <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
    <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="sticky">
      <div className="">
        {selectedData === "traits" && traits && <TraitsList traits={traits} />}
        {selectedData === "statistics" && traits && <ListingsGraph />}
        {selectedData === "listed" && (
          // <Box
          //   className="flex flex-row flex-wrap mt-5 gap-1"
          //   style={{ overflow: "auto" }}
          // >
          // </Box>
          <ListedNfts parentRef={parentRef} />
        )}
        {selectedData === "solanafm" && (
          <div id="solanafm" className="flex w-full">
            <iframe
              ref={iframeRef}
              height="600px"
              width="100%"
              src={`https://solana.fm/address/${chainCollectionData?.collectionMint}?cluster=devnet-solana`}
              // todo remove cluster once we migrate
            />
          </div>
        )}
      </div>
    </motion.div>
  </motion.div>
);
