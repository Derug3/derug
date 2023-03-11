import { Box, Text } from "@primer/react";
import { motion } from "framer-motion";
import { FC, useMemo } from "react";
import { IListed, ITrait } from "../../interface/collections.interface";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";
import ListingsGraph from "../ListingsGraph/ListingsGraph";
import TraitsList from "../Traits/TraitsList";

export const RightPane: FC<{
  selectedData: string;
  traits: ITrait[] | undefined;
  iframeRef: any;
}> = ({ selectedData, traits, iframeRef }) => (
  <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
    <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="sticky">
      <div className="">
        {selectedData === "traits" && traits && <TraitsList traits={traits} />}
        {selectedData === "statistics" && traits && <ListingsGraph />}
        {selectedData === "solanafm" && (
          <div id="solanafm" className="flex w-full">
            <iframe
              ref={iframeRef}
              height="600px"
              width="100%"
              src={`https://solana.fm/address/HUxWyo9a5uTxzLdSSY1LVsndnHfYkJhkRoP51ghLYEs7?cluster=devnet-solana`}
            />
          </div>
        )}
      </div>
    </motion.div>
  </motion.div>
);
