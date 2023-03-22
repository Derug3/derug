import { motion } from "framer-motion";
import { FC, useMemo } from "react";
import {
  IChainCollectionData,
  ICollectionData,
} from "../../interface/collections.interface";

import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";

export const ActiveListingItem: FC<{
  collectionData: ICollectionData;
}> = ({ collectionData }) => (
  <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
    <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="sticky">
      {collectionData && collectionData.description}
    </motion.div>
  </motion.div>
);
