import { Box, TabNav, Text } from "@primer/react";
import { motion } from "framer-motion";
import React, { FC } from "react";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";
import ListedNfts from "../ListedNfts/ListedNfts";

export const LeftPane: FC<{
  selectedInfo: string;
  parentRef: React.MutableRefObject<HTMLDivElement | null>;
  description: string | undefined;
}> = ({ selectedInfo, parentRef, description }) => (
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
            sx={{ p: 2 }}
            className="text-white text-left"
          >
            {description}
          </Text>
        )}
        {selectedInfo === "listed" && (
          <Box
            className="flex flex-row flex-wrap mt-5 gap-1"
            style={{ overflow: "auto" }}
          >
            <ListedNfts parentRef={parentRef} />
          </Box>
        )}
      </div>
    </motion.div>
  </motion.div>
);
