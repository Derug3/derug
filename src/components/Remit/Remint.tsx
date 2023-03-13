import { Box } from "@primer/react";
import React, { FC, useContext, useMemo } from "react";
import { IRequest } from "../../interface/collections.interface";
import { CollectionContext } from "../../stores/collectionContext";
import WinningRequest from "../DerugRequest/WinningRequest";

export const Remint: FC<{
  getWinningRequest: IRequest | undefined;
}> = ({ getWinningRequest }) => {
  return (
    <Box className="py-2 flex-col gap-10">
      {getWinningRequest && <WinningRequest request={getWinningRequest} />}
    </Box>
  );
};

export default Remint;
