import { Box, Text } from "@primer/react";
import React, { FC, useMemo } from "react";
import { ITrait } from "../../interface/collections.interface";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
const Traits: FC<{ trait: ITrait }> = ({ trait }) => {
  const renderTraits = useMemo(() => {
    return trait.values.map((t) => {
      return (
        <Box className="flex flex-col gap-1 items-center">
          <Box className="flex flex-col items-start">
            <Text className="text-xs font-semibold">{t.name}</Text>
            {/* <Text className="text-xs font-normal">Listed:{t.listedCount}</Text>
            <Text className="text-xs font-normal">
            Floor price:{t.fp / LAMPORTS_PER_SOL}
        </Text> */}
          </Box>
          <img src={t.image} className="rounded-[8px] w-20" />
        </Box>
      );
    });
  }, [trait]);
  return (
    <Box className="flex flex-col pl-5 pt-5 items-start">
      <Text className="capitalize font-bold">
        {trait.name}({trait.values.length})
      </Text>
      <hr />
      <Box className="grid grid-cols-7 gap-y-10">{renderTraits}</Box>
    </Box>
  );
};

export default Traits;
