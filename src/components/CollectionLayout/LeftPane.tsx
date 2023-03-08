import { Box, Text } from "@primer/react";
import { motion } from "framer-motion";
import { FC } from "react";
import { IListed } from "../../interface/collections.interface";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";

export const LeftPane: FC<{
  selectedInfo: string;
  listings: IListed[] | undefined;
}> = ({ selectedInfo, listings }) => (
  <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
    <motion.div
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      className="pl-10 sticky"
    >
      <div className="">
        {(selectedInfo === "description" || selectedInfo === "") && (
          <Text id="description" as="p" sx={{ p: 2 }}>
            text
          </Text>
        )}
        {selectedInfo === "listed" && listings && (
          <Box className="flex flex-row flex-wrap mt-5 gap-1">
            {listings.map((list: IListed) => (
              <Box className="flex w-20">
                <img src={list.extra.img} className="rounded-[4px]" />
              </Box>
            ))}
          </Box>
        )}
      </div>
    </motion.div>
  </motion.div>
);
