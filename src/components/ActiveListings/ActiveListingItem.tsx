import { Box } from "@primer/react";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { ICollectionData } from "../../interface/collections.interface";

import {
  COLLECTION,
  FADE_DOWN_ANIMATION_VARIANTS,
} from "../../utilities/constants";

export const ActiveListingItem: FC<{
  collectionData: ICollectionData;
}> = ({ collectionData }) => {
  const [hover, setHover] = useState(false);

  const navigate = useNavigate();
  return (
    <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="flex w-full">
      <Box className="flex flex-row items-start gap-5 p-2 bg-transparent">
        <img
          src={collectionData.image}
          onClick={() =>
            navigate(`${COLLECTION}?symbol=${collectionData.symbol}`)
          }
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          alt="colectionImg"
          style={{
            opacity: hover ? 0.6 : 1,
            transform: hover ? "scale(1.1)" : "scale(1)",
            transition: "all .2s ease-out",
          }}
          className="w-full h-40 object-cover"
        />
      </Box>
    </motion.div>
  );
};

export default ActiveListingItem;
