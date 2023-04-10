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
            <span
              className="px-4"
              style={{
                border: "1px solid rgb(9, 194, 246)",
                borderBottom: "none",
              }}
            >
              active derugs
            </span>
          </Text>
        </Box>
        <Box
          className="flex flex-wrap flex-row box-content cursor-pointer overflow-hidden w-full"
          style={{ border: "1px solid rgb(9, 194, 246)" }}
        >
          {activeListings.map((cd) => {
            return <ActiveListingItem collectionData={cd} />;
          })}
        </Box>
      </Box>
    )}
  </motion.div>
);
