import { Box, Text } from "@primer/react";
import React, { FC, useMemo } from "react";
import { ITrait } from "../../interface/collections.interface";
const Traits: FC<{ trait: ITrait }> = ({ trait }) => {
  const renderTraits = useMemo(() => {
    return trait.values.map((t) => {
      return (
        <Box
          key={t.name}
          className="flex flex-row gap-5 items-center justify-center pl-1 pr-3 py-3"
          sx={{
            border: `2px solid rgb(9, 194, 246)`,
            borderRadius: "4px",
            background: "rgb(9, 194, 246,.15)",
          }}
        >
          <img src={t.image} className="rounded-[4px] w-20" />
          <Box className="flex flex-col items-center justify-center">
            <Text className="text-sm font-semibold">{t.name}</Text>
            <Text
              style={{
                filter: "drop-shadow(rgb(9, 194, 246) 0px 0px 15px)",
                color: "rgb(9, 194, 246)",
                fontWeight: "bold",
              }}
              className="text-xs  text-bold uppercase"
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
      <Text className="uppercase font-bold text-cyan-500">
        {trait.name} [{trait.values.length}]
      </Text>
      <Box className="h-0.5 bg-gray-200 w-full mb-3" />
      <Box className="grid md:grid-cols-4 grid-cols-1 gap-3">
        {renderTraits}
      </Box>
    </Box>
  );
};

export default Traits;
