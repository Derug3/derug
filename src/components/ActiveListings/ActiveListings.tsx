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
      <Box className="flex flex-col w-full">
        <Box className="flex flex-row justify-between items-center">
          <Text className="text-2xl font-bold">Active Listings</Text>
          <Text className="text-sm font-bold text-gray-500">
            {activeListings && activeListings.length} Listings
          </Text>
        </Box>
        <Box className="flex flex-col w-full">
          {activeListings &&
            activeListings.map((cd) => {
              return <ActiveListingItem collectionData={cd} />;
            })}
        </Box>
      </Box>
    </motion.div>
  </motion.div>
);
