import { Box, Text } from "@primer/react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { IListed } from "../../interface/collections.interface";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";

export const Content = (listings: IListed[] | undefined) => {
  return (
    <motion.div
      className="flex flex-col items-left text-left justify-center"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
    >
      <motion.div
        className="flex flex-row flex-wrap items-center font-mono font-bold "
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        style={{
          borderBottom: "2px solid rgb(9, 194, 246)",
        }}
      >
        LISTING STATS
      </motion.div>
      {listings && (
        <Box className="flex flex-row flex-wrap mt-5 gap-1">
          {listings.map((list: IListed) => (
            <Box className="flex w-20">
              <img src={list.extra.img} className="rounded-[4px]" />
            </Box>
          ))}
        </Box>
      )}
    </motion.div>
  );
};
