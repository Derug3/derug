import { Box, Text } from "@primer/react";
import React, { FC, useMemo } from "react";
import { ITrait } from "../../interface/collections.interface";
const Traits: FC<{ trait: ITrait }> = ({ trait }) => {
  const renderTraits = useMemo(() => {
    return trait.values.map((t) => {
      return (
        <Box
          key={t.name}
          className="flex flex-row gap-5 items-center justify-start "
        >
          <img src={t.image} className="w-16" />
          <Box className="flex flex-col items-center justify-center">
            <Text className="text-sm text-left w-full" sx={{ color: "white" }}>
              {t.name}
            </Text>
            <Text
              style={{
                filter: "drop-shadow(rgb(9, 194, 246) 0px 0px 15px)",
                color: "rgb(9, 194, 246)",
              }}
              className="text-xs w-full text-left"
            >
              {t.percentage}%
            </Text>
          </Box>
        </Box>
      );
    });
  }, [trait]);
  return (
    <Box className="flex flex-col pt-5 items-start">
      <Text className=" font-mono text-white">
        {trait.name} [{trait.values.length}]
      </Text>
      <Box className="h-0.5 bg-gray-200 w-full mb-3" />
      <Box className="grid grid-rows-4 grid-flow-col w-full gap-1">
        {renderTraits}
      </Box>
    </Box>
  );
};

export default Traits;
