import { motion } from "framer-motion";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { ICollectionData } from "../../interface/collections.interface";

import {
  COLLECTION,
  FADE_DOWN_ANIMATION_VARIANTS,
} from "../../utilities/constants";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { Box, Text } from "@primer/react";

export const ActiveListingItem: FC<{
  collectionData: ICollectionData;
}> = ({ collectionData }) => {
  const [hover, setHover] = useState(false);

  const navigate = useNavigate();
  return (
    <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="flex w-1/2 py-3">
      <Box className="flex w-full flex-row items-start gap-5 p-2 bg-transparent">
        <img
          src={collectionData.image}
          onClick={() =>
            navigate(`${COLLECTION}?symbol=${collectionData.symbol}`)
          }
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          alt="colectionImg"
          style={{
            opacity: hover ? 0.8 : 1,
            transform: hover ? "scale(1.1)" : "scale(1)",
            transition: "all .2s ease-out",
            height: "100px",
            width: "100px",
          }}
          className="w-full h-40 object-cover"
        />
        <div className="flex flex-row justify-between text-white w-fit">
          <div className="flex flex-col">
            <div className="flex w-full justify-between">

              <h3 className="flex" style={{ color: 'rgb(9, 194, 246)' }}>{collectionData.name}</h3>
              <div className="flex gap-3">
                <a href={collectionData.discord} target={"_blank"} rel="noreferrer">
                  <FaDiscord
                    style={{
                      cursor: "pointer",
                      fontSize: "1em",
                    }}
                  />
                </a>
                <a href={collectionData.twitter} target={"_blank"} rel="noreferrer">
                  <FaTwitter
                    style={{
                      cursor: "pointer",
                      fontSize: "1em",
                    }}
                  />
                </a>
              </div>
            </div>
            {/* <p>{collectionData.description}</p> */}
            <Text
              className="text-left text-md text-white opacity-80 font-mono max-h-24 overflow-auto "
            >
              {collectionData.description ?? (
                <Skeleton
                  baseColor="rgb(22,27,34)"
                  highlightColor="rgb(29,35,44m)"
                  height={32}
                ></Skeleton>
              )}
            </Text>
          </div>
        </div>
      </Box>
    </motion.div>
  );
};

export default ActiveListingItem;
