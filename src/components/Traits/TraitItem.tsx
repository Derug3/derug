import { Box, Text } from "@primer/react";
import React, { FC } from "react";
import { ITraitInfo } from "../../interface/collections.interface";

const TraitItem: FC<{ name: string; values: ITraitInfo[] }> = ({
  name,
  values,
}) => {
  return (
    <Box className="flex flex-col">
      <Text as={"p"} className="font-bold text-lg">
        {name}
      </Text>
    </Box>
  );
};

export default TraitItem;
