import { Box, Button, Text } from "@primer/react";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../utilities/constants";
import CollectionData from "../CollectionData/CollectionData";
import ListedNfts from "../ListedNfts/ListedNfts";
import tensorLogo from "../../assets/tensorLogo.png";
import magicEdenLogo from "../../assets/magicEdenLogo.png";
import { useWallet } from "@solana/wallet-adapter-react";

export const LeftPane: FC<{
  selectedInfo: string;
}> = ({ selectedInfo }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const slug = useSearchParams()[0].get("symbol");

  const wallet = useWallet();
  return (
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
            <>
              <Text
                id="description"
                as="p"
                sx={{ p: 2, maxHeight: "32em", overflow: "none" }}
              >
                <Box className="flex flex-col items-end">
                  <div className="flex gap-3 items-center">
                    <AiOutlineStar
                      style={{ color: isFavorite ? "#F0CF65" : "white" }}
                      className="text-4xl text-red cursor-pointer"
                      onClick={() => setIsFavorite(!isFavorite)}
                    />
                    <img
                      src={tensorLogo}
                      alt="tensorLogo"
                      className="w-8 h-8 rounded-full cursor-pointer"
                      onClick={() =>
                        window.open(
                          `https://www.tensor.trade/trade/${slug}`,
                          "_blank"
                        )
                      }
                    />
                    <img
                      src={magicEdenLogo}
                      alt="magicEden"
                      className="w-8 h-8 rounded-full cursor-pointer"
                      onClick={() =>
                        window.open(
                          `https://magiceden.io/marketplace/${slug}`,
                          "_blank"
                        )
                      }
                    />
                  </div>
                </Box>
                <CollectionData />
              </Text>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
