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
    {activeListings && (
      <Box className="flex flex-col w-full">
        <Box className="flex flex-row justify-between items-center">
          <Text className="text-xl font-mono text-main-blue flex justify-center w-full">
            <span className="border-r-4 border-t-4 border-l-4 border-slate-700 px-4">
              active derugs
            </span>
          </Text>
        </Box>
        <Box className="grid grid-cols-6 grid-row-6 box-content cursor-pointer overflow-hidden border-t-4 p-4 border-slate-700 w-full">
          {activeListings.map((cd) => {
            return <ActiveListingItem collectionData={cd} />;
          })}
        </Box>
      </Box>
    )}
  </motion.div>
);
