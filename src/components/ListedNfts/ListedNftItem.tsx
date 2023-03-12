import { Box, Button, Text } from "@primer/react";
import { FC, useState } from "react";
// import { IListedNft } from "../../interface/collections.interface";
import magicEdenLogo from "../../assets/magicEdenLogo.png";
import { INftListing } from "../../interface/collections.interface";
const ListedNftItem: FC<{ listedNft: INftListing }> = ({ listedNft }) => {
  const [hover, setHover] = useState(false);

  return (
    <Box
      className="flex relative flex-col gap-5 px-2 py-4  items-start border-cyan-500 ease-in duration-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={listedNft.imageUrl}
        alt="nftImg"
        className="rounded-[4px] w-48"
        style={{ opacity: hover ? 0.2 : 1 }}
      />
      {hover && (
        <Box className="flex absolute flex-col w-full h-full gap-2 items-center justify-center text-white font-mono">
          <Box className="flex flex-row  items-center">
            <Box className="flex flex-row">
              <Text className="text-sm text-black-400 font-bold">
                {listedNft.name}
              </Text>
              <img
                src={magicEdenLogo}
                alt="meLogo"
                className="rounded-[50px] w-8 h-8"
              />
            </Box>
            <Text className="text-sm text-black-400 font-bold ">
              {listedNft.price} SOL
            </Text>
          </Box>
          <Box className="flex flex-row gap-5 items-center">
            <Button
              className="bg-transparent font-mono font-bold text-lg"
              sx={{
                bg: "transparent",
                fontFamily: "monospace",
                padding: "1em",
              }}
            >
              Details
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ListedNftItem;
