import { Box, Button, ProgressBar, Text, Tooltip } from "@primer/react";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { FC, useContext, useMemo } from "react";
import { IRequest } from "../../interface/collections.interface";
import { claimVictory } from "../../solana/methods/remint";
import { CollectionContext } from "../../stores/collectionContext";
import { toast } from "react-hot-toast";
import { getCollectionDerugData } from "../../solana/methods/derug";
const WinningRequest: FC<{ request: IRequest }> = ({ request }) => {
  const { collectionDerug, setCollectionDerug } = useContext(CollectionContext);

  const wallet = useWallet();

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

  const claimDerugVictory = async () => {
    try {
      if (wallet && collectionDerug && request) {
        await claimVictory(wallet!, collectionDerug, request);
        const updatedDerug = await getCollectionDerugData(
          collectionDerug.address
        );
        setCollectionDerug(updatedDerug);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Box
      className="flex flex-row justify-between items-center w-full p-4"
      sx={{
        background: "rgb(9, 194, 246,.15)",
        border: "1px solid rgb(255  225 93)",
      }}
    >
      <Box className="flex flex-col gap-10 items-start">
        <Box className="flex flex-row gap-10 items-center">
          <Box>
            <Box className="border-cyan-400 py-2 px-4 text-white">
              <Text className="font-mono ">Winning request</Text>
            </Box>
          </Box>
          <Text className="font-mono text-white">
            {request.derugger.toString()}
          </Text>
        </Box>
        <Box className="flex flex-row gap-3">
          <Text className="font-mono text-white">{"Twitter handle"}</Text>
          <Box className="flex flex-row gap-3">{renderUtilities}</Box>
        </Box>
      </Box>
      <Box className="flex flex-col gap-5 items-center">
        <Box className="flex flex-row items-center gap-4">
          <ProgressBar
            progress={
              (request.voteCount / (collectionDerug?.totalSupply ?? 1)) * 100
            }
            bg="rgb(45, 212, 191)"
            sx={{
              width: "280px",
              filter: "drop-shadow(white 0px 0px 3px)",
              height: "16px",
              borderRadius: 0,
              color: "rgb(45, 212, 191)",
              marginLeft: "1em",
            }}
          />
          <Text className="text-white font-bold" color={"rgb(45, 212, 191)"}>
            {request.voteCount} / {collectionDerug?.totalSupply}
          </Text>
        </Box>
        <Button
          className="font-bold"
          sx={{
            width: "70%",
            background: "rgb(45, 212, 191)",
            color: "black",
          }}
          onClick={claimDerugVictory}
        >
          Claim victory
        </Button>
      </Box>
    </Box>
  );
};

export default WinningRequest;
