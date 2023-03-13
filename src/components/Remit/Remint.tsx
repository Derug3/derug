import { Box } from "@primer/react";
import React, { useContext, useMemo } from "react";
import { CollectionContext } from "../../stores/collectionContext";
import WinningRequest from "../DerugRequest/WinningRequest";

const Remint = () => {
  const { derugRequests } = useContext(CollectionContext);

  const getWinningRequest = useMemo(() => {
    return derugRequests?.sort((a, b) => a.voteCount - b.voteCount)[
      derugRequests.length - 1
    ];
  }, [derugRequests]);

  return (
    <Box
      className="w-full py-2 flex-col gap-10"
      sx={{ p: 0, padding: "0.5em 1.5em", margin: "3em 0" }}
    >
      <WinningRequest request={getWinningRequest!} />
    </Box>
  );
};

export default Remint;
