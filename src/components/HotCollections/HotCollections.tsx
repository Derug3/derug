import React, { FC, useMemo } from "react";
import { Box, Text } from "@primer/react";
import Select from "react-select";
import { ICollectionVolume } from "../../interface/collections.interface";
import { CollectionVolumeFilter } from "../../enums/collections.enums";
import HotCollectionItem from "./HotCollectionItem";
const HotCollections: FC<{
  collections: ICollectionVolume[];
  filter: CollectionVolumeFilter;
}> = ({ filter, collections }) => {
  const renderCollectionItem = useMemo(() => {
    return collections.map((c) => {
      return (
        <HotCollectionItem collection={c} filter={filter} key={c.symbol} />
      );
    });
  }, [collections]);

  return (
    <Box className="w-full flex-col gap-5 mt-6 flex gap-5">
      <Box className="w-full flex justify-between">
        <Text className="font-mono font-bold text-green-color text-xl border-b-[2px] border-green-color">
          COLLECTIONS 🔥
        </Text>
        <Select />
      </Box>
      <Box className="grid grid-cols-3 gap-10">{renderCollectionItem}</Box>
    </Box>
  );
};

export default HotCollections;
