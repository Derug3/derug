import { Box, Text } from "@primer/react";
import React, { useContext } from "react";
import { CollectionContext } from "../../stores/collectionContext";
import { FaTwitter } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

const CollectionData = () => {
  const { collection } = useContext(CollectionContext);
  return (
    <Box className="flex flex-column gap-5">
      <Box className="flex flex-row items-center">
        <img
          src={collection?.image}
          alt="collectionImg"
          className="rounded-[50px] w-40"
        />
        <Box className="flex flex-column gap-2">
          <Text
            as={"h4"}
            className="font-md font-bold font-monospace text-white-500"
          >
            {collection?.name}
          </Text>
          <Box className="flex flex-row gap-1">
            {collection?.discord && <FaDiscord />}
            {collection?.twitter && <FaTwitter />}
          </Box>
        </Box>
      </Box>
      <Text>{collection?.description}</Text>
    </Box>
  );
};

export default CollectionData;
