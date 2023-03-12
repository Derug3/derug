import { Box, Text } from "@primer/react";
import { motion } from "framer-motion";
import { FC } from "react";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";
import CollectionData from "../CollectionData/CollectionData";
import ListedNfts from "../ListedNfts/ListedNfts";

export const LeftPane: FC<{
  selectedInfo: string;
}> = ({ selectedInfo }) => (
  <motion.div
    variants={FADE_DOWN_ANIMATION_VARIANTS}
    style={{ overflow: "auto" }}
  >
    <motion.div
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      className="pl-10 sticky"
    >
      <div className="">
        {(selectedInfo === "description" || selectedInfo === "") && (
          <Text
            id="description"
            as="p"
            sx={{ p: 2, maxHeight: "32em", overflow: "none" }}
          >
            <CollectionData />
          </Text>
        )}
      </div>
    </motion.div>
  </motion.div>
);
