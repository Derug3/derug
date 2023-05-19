import { Box, Button, ProgressBar, Text, Tooltip } from "@primer/react";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { FC, useContext, useMemo, useState } from "react";
import { IRequest } from "../../interface/collections.interface";
import { claimVictory, getCandyMachine } from "../../solana/methods/remint";
import { CollectionContext } from "../../stores/collectionContext";
import { toast } from "react-hot-toast";
import { getCollectionDerugData } from "../../solana/methods/derug";
import { DerugStatus } from "../../enums/collections.enums";
import { getTrimmedPublicKey } from "../../solana/helpers";
import dayjs from "dayjs";
import {
  initCandyMachine,
  storeCandyMachineItems,
} from "../../solana/methods/public-mint";
import { Oval } from "react-loader-spinner";
const WinningRequest: FC<{ request: IRequest }> = ({ request }) => {
  const {
    collectionDerug,
    setCollectionDerug,
    remintConfig,
    chainCollectionData,
    candyMachine,
    setCandyMachine,
  } = useContext(CollectionContext);

  const [loading, toggleLoading] = useState(false);

  const [claiming, toggleClaiming] = useState(false);

  const wallet = useWallet();

  console.log(request, "REQUEST");

  const renderUtilities = useMemo(() => {
    return request.utility.map((u, i) => {
      return (
        <Tooltip
          sx={{
            "::after": {
              fontSize: "1em",
              backgroundColor: "#282C34",
              width: "fit-content",
            },
          }}
          aria-label={u.description}
          noDelay={true}
        >
          <div
            className="text-sm font-mono"
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
      toggleClaiming(true);
      if (wallet && collectionDerug && request && chainCollectionData) {
        await claimVictory(
          wallet!,
          collectionDerug,
          chainCollectionData,
          request
        );
        const updatedDerug = await getCollectionDerugData(
          collectionDerug.address
        );
        setCollectionDerug(updatedDerug);
      }
      toggleClaiming(false);
    } catch (error: any) {
      toggleClaiming(false);

      toast.error(error.message);
    }
  };

  const initPublicMinting = async () => {
    try {
      toggleLoading(true);
      if (collectionDerug && wallet && remintConfig) {
        if (!candyMachine) {
          const candyMachineAddress = await initCandyMachine(
            collectionDerug,
            wallet
          );
          if (candyMachineAddress)
            setCandyMachine(await getCandyMachine(candyMachineAddress));
        }
        await storeCandyMachineItems(
          request,
          remintConfig,
          wallet,
          collectionDerug
        );
        setCandyMachine(await getCandyMachine(remintConfig.candyMachine));
      }
      toast.success("Public minting successfully initialized");
    } catch (error) {
      console.log(error);
      toast.error("Failed to initialize public minting");
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <Box className="flex flex-row justify-between items-center w-full relative mt-5 pl-10 pr-4">
      <Box
        className="flex flex-col gap-5 w-full"
        sx={{
          border:
            "1px solid animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500",
          boxShadow: "0 0 0 1px #B78E1B",
        }}
        padding="2em"
      >
        <Box className="flex flex-row justify-between ">
          <div className="flex items-center gap-1">
            <Text className="font-mono flex justify-center text-sm text-yellow-500	">
              Winning request
            </Text>
            ☀️
          </div>
        </Box>
        <Box
          className="flex flex-row gap-3 justify-between w-full items-center"
          sx={{
            color: "rgb(45, 212, 191)",
            border: "1px solid rgba(9,194,246,.15)",
            padding: "1em",
          }}
        >
          <Text className="font-mono text-neutral-400 flex justify-center text-sm">
            {getTrimmedPublicKey(request.derugger.toString())}
          </Text>
          <Box className="flex flex-row gap-3">{renderUtilities}</Box>
        </Box>
        <Box className="flex flex-col gap-5 items-center w-full">
          <Box className="flex font-mono flex-row items-center justify-between w-full gap-4 ">
            {collectionDerug &&
              collectionDerug.status !== DerugStatus.Reminting &&
              collectionDerug.status !== DerugStatus.UploadingMetadata &&
              wallet.publicKey?.toString() === request.derugger.toString() && (
                <button
                  className="flex items-center justify-center hover:shadow-lg hover:shadow-main-blue"
                  style={{
                    color: "white",
                    padding: "0.25em",
                    borderRadius: 0,
                    width: "30%",
                    border: "2px solid rgba(9, 194, 246)",
                    background: "transparent",
                  }}
                  onClick={claimDerugVictory}
                >
                  {claiming ? (
                    <Oval
                      color="rgb(9, 194, 246)"
                      height={"1.5em"}
                      secondaryColor="transparent"
                    />
                  ) : (
                    <span className="text-xl ">Claim Victory</span>
                  )}
                </button>
              )}
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-5">
                <ProgressBar
                  progress={
                    (request.voteCount / (collectionDerug?.totalSupply ?? 1)) *
                    100
                  }
                  bg="#2DD4BF"
                  sx={{
                    width: "380px",
                    height: "30px",
                    color: "rgb(45, 212, 191)",
                    "@media (max-width: 768px)": {
                      width: "200px",
                    },
                  }}
                />

                <Text
                  className="text-white font-mono flex"
                  color={"rgb(9, 194, 246)"}
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {request.voteCount} / {collectionDerug?.totalSupply}
                </Text>
              </div>
              {remintConfig &&
                (dayjs(remintConfig.privateMintEnd).isBefore(dayjs()) ||
                  (remintConfig.mintPrice !== undefined &&
                    !remintConfig.privateMintEnd)) &&
                wallet.publicKey?.toString() === request.derugger.toString() &&
                collectionDerug?.status !== DerugStatus.UploadingMetadata && (
                  <Button
                    className="animate-text bg-gradient-to-r from-teal-500 
                    via-purple-500 to-orange-500 p-1 rounded-md"
                    sx={{
                      color: "white",
                    }}
                    onClick={initPublicMinting}
                  >
                    {!loading ? (
                      <span className="text-xl lowercase">
                        Initialize public mint
                      </span>
                    ) : (
                      <Oval
                        color="rgb(9, 194, 246)"
                        height={"1.1em"}
                        secondaryColor="transparent"
                      />
                    )}
                  </Button>
                )}
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WinningRequest;
