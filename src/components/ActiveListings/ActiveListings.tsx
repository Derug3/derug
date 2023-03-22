import { Box, Text } from "@primer/react";
import { motion } from "framer-motion";
import { FC, useMemo } from "react";
import {
  IChainCollectionData,
  ICollectionData,
} from "../../interface/collections.interface";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";
import { ActiveListingItem } from "./ActiveListingItem";

export const ActiveListings: FC<{
  activeListings?: ICollectionData[];
}> = ({ activeListings }) => (
  <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
    <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="sticky">
      <Box className="flex flex-col w-full gap-5 mb-5">
        <Box className="flex flex-row justify-between items-center">
          <Text
            className="text-3xl font-bold text-main-blue"
            sx={{ fontFamily: "monospace" }}
          >
            Active Derugs
          </Text>
        </Box>
        <Box className="grid grid-cols-5">
          {activeListings &&
            activeListings.map((cd) => {
              return <ActiveListingItem collectionData={cd} />;
            })}
        </Box>
      </Box>
    </motion.div>
  </motion.div>
);
