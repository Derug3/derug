import { Box, Button, Text } from "@primer/react";
import { motion } from "framer-motion";
import { FC, useMemo } from "react";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router";
import { SYMBOL } from "../../api/url.api";
import {
  IChainCollectionData,
  ICollectionData,
} from "../../interface/collections.interface";

import {
  COLLECTION,
  FADE_DOWN_ANIMATION_VARIANTS,
} from "../../utilities/constants";

export const ActiveListingItem: FC<{
  collectionData: ICollectionData;
}> = ({ collectionData }) => {
  const navigate = useNavigate();
  return (
    <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
      <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="sticky">
        <Box className="flex flex-col items-start gap-5 border-[1px] border-main-blue rounded-md p-2 bg-transparent">
          <img
            src={collectionData.image}
            alt="colectionImg"
            className="rounded-md w-full"
          />

          <Box className="flex flex-row justify-between items-center p-2 w-full ">
            <Text className="text-white font-bold font-lg">
              {collectionData.name}
            </Text>

            <button
              className="border-[1px] p-1 rounded-md border-main-blue text-main-blue
              bg-transparent hover:bg-main-blue hover:text-black"
              style={{ fontFamily: "monospace" }}
              onClick={() =>
                navigate(`${COLLECTION}?symbol=${collectionData.symbol}`)
              }
            >
              Details
            </button>
          </Box>
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default ActiveListingItem;
