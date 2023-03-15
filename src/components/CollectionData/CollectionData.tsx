import { Box, Button, Text } from "@primer/react";
import React, { useContext } from "react";
import { CollectionContext } from "../../stores/collectionContext";
import { FaTwitter } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

const CollectionData = () => {
  const { collection, chainCollectionData } = useContext(CollectionContext);
  return (
    <Box className="flex flex-col gap-5 pr-2">
      <Box className="flex flex-row items-start gap-5">
        <img
          src={collection?.image}
          alt="collectionImg"
          className="rounded-[50%] w-32"
        />
        <Box className="flex flex-col gap-4 items-start">
          <Text className="font-bold font-monospace text-white-500 text-4xl">
            {collection?.name}
          </Text>
          {chainCollectionData && (
            <>
              <Text>
                Rugged by:
                <span
                  style={{
                    color: "#FD5D5D",
                    filter: "drop-shadow(rgb(223, 46, 56),0 0 15px)",
                    fontSize: "1em",
                  }}
                >
                  {chainCollectionData.rugUpdateAuthority}
                </span>
              </Text>
            </>
          )}
          <Box className="flex flex-row gap-5">
            {collection?.discord && (
              <a href={collection.discord} target={"_blank"} rel="noreferrer">
                <FaDiscord
                  style={{
                    cursor: "pointer",
                    fontSize: "1.75em",
                    color: "rgb(88 101 242)",
                  }}
                />
              </a>
            )}
            {collection?.twitter && (
              <a href={collection.twitter} target={"_blank"} rel="noreferrer">
                <FaTwitter
                  style={{
                    cursor: "pointer",
                    fontSize: "1.75em",
                    color: "rgb(29 161 242)",
                  }}
                />
              </a>
            )}
          </Box>
        </Box>
      </Box>
      <Text className="text-left text-lg">{collection?.description}</Text>
    </Box>
  );
};

export default CollectionData;
