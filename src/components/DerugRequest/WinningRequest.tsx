import { Box, Button, ProgressBar, Text, Tooltip } from "@primer/react";
import React, { FC, useContext, useMemo } from "react";
import { IRequest } from "../../interface/collections.interface";
import { CollectionContext } from "../../stores/collectionContext";

const WinningRequest: FC<{ request: IRequest }> = ({ request }) => {
  const { collectionDerug } = useContext(CollectionContext);

  const renderUtilities = useMemo(() => {
    return request.utility.map((u, i) => {
      return (
        <Tooltip
          sx={{
            "::after": {
              fontSize: "1em",
              backgroundColor: "#282C34",
            },
          }}
          direction="e"
          aria-labderugRequest={u.description}
          noDelay={true}
        >
          <div
            className="text-sm font-mono cursor-hderugRequestp"
            style={{
              borderRightWidth:
                i !== request.utility.length - 1 ? "1px" : "0px",
              paddingRight: i !== request.utility.length - 1 ? "1em" : "0px",
              color: "rgb(9, 194, 246)",
            }}
          >
            {" "}
            {u.title}
          </div>
        </Tooltip>
      );
    });
  }, []);

  return (
    <Box className="flex flex-row justify-between w-full items-center w-full">
      <Box className="flex flex-col gap-5 w-full px-16 py-5">
        <Box className="flex flex-row  ">
          <Text className="font-mono text-neutral-400 flex justify-center">
            {request.derugger.toString()}
          </Text>
        </Box>
        <Box
          className="flex flex-row gap-3 justify-between w-full items-center"
          sx={{
            color: "rgb(45, 212, 191)",
            border: "1px solid rgba(9,194,246,.15)",
            padding: "1em",
          }}
        >
          <Text className="font-mono text-white">{"Twitter handle"}</Text>
          <Box className="flex flex-row gap-3">{renderUtilities}</Box>
        </Box>
        <Box className="flex flex-col gap-5 items-center w-full mt-2">
          <Box className="flex flex-row items-center justify-between w-full gap-4">
            <ProgressBar
              progress={
                (request.voteCount / (collectionDerug?.totalSupply ?? 1)) * 100
              }
              bg="rgba(9, 194, 246, 0.6)"
              sx={{
                width: "280px",
                filter: "drop-shadow(white 0px 0px 3px)",
                borderRadius: 0,
                color: "rgb(45, 212, 191)",
              }}
            />
            <Text
              className="text-white font-mono text-xs	"
              color={"rgb(9, 194, 246)"}
            >
              {request.voteCount} / {collectionDerug?.totalSupply}
            </Text>
          </Box>
          <Button
            className="font-bold mt-5"
            sx={{
              width: "100%",
              color: "white",
              background: "rgba(9, 194, 246, 0.6)",
              padding: "1.25em",
            }}
          >
            Claim victory
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default WinningRequest;
