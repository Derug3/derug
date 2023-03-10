import { Box, Button, Text } from "@primer/react";
import { FC } from "react";
// import { IListedNft } from "../../interface/collections.interface";
import magicEdenLogo from "../../assets/magicEdenLogo.png";
import { INftListing } from "../../interface/collections.interface";
const ListedNftItem: FC<{ listedNft: INftListing }> = ({ listedNft }) => {
  return (
    <Box className="flex flex-col gap-5 px-2 py-4  items-start border-cyan-500">
      <img
        src={listedNft.imageUrl}
        alt="nftImg"
        className="rounded-[4px] w-32 h-32"
      />

      <Box className="flex flex-col gap-2 items-start">
        <Box className="flex flex-row">
          <Text className="text-sm text-black-400 font-bold">
            {listedNft.name}
          </Text>
          <img
            src={magicEdenLogo}
            alt="meLogo"
            className="rounded-[50px] w-5 h-5"
          />
        </Box>
        <Box className="flex flex-row  items-center">
          <Text className="text-sm text-black-400 font-bold ">
            {listedNft.price} SOL
          </Text>
          <Box className="flex flex-row gap-5 items-center">
            <Button
              sx={{
                bg: "transparent",
                border: "1px solid cyan",
                fontFamily: "monospace",
                color: "cyan",
                padding: "15px 0px",
              }}
            >
              Details
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListedNftItem;
