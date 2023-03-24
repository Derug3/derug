import {
  Button,
  Box,
  Dialog,
  FormControl,
  ProgressBar,
  TextInput,
  Tooltip,
} from "@primer/react";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { FC, useContext, useRef, useState } from "react";
import Balancer from "react-wrap-balancer";
import { DerugStatus } from "../../enums/collections.enums";
import { IRequest } from "../../interface/collections.interface";
import {
  castDerugRequestVote,
  getSingleDerugRequest,
} from "../../solana/methods/derug-request";
import { CollectionContext } from "../../stores/collectionContext";
import { getAllNftsFromCollection } from "../../utilities/nft-fetching";
import { toast } from "react-hot-toast";
import { Oval } from "react-loader-spinner";
export const DerugRequestItem: FC<{
  derugRequest: IRequest;
  index: number;
}> = ({ derugRequest, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<IRequest>();
  const [loading, toggleLoading] = useState(false);
  const {
    collection,
    collectionDerug,
    chainCollectionData,
    setRequests,
    derugRequests,
  } = useContext(CollectionContext);

  const wallet = useWallet();

  const showVoteButton = () => {
    return (
      (collectionDerug?.status === DerugStatus.Initialized ||
        collectionDerug?.status === DerugStatus.Voting) &&
      !collectionDerug.addedRequests.find((ar) => ar.winning)
    );
  };

  function showClaimButton() {
    return collectionDerug?.status === DerugStatus.Completed;
  }

  function showRemintButton() {
    return collectionDerug?.status === DerugStatus.Reminting;
  }

  const castVote = async () => {
    if (wallet && collectionDerug && chainCollectionData) {
      try {
        toggleLoading(true);
        const derugNfts = await getAllNftsFromCollection(
          wallet,
          collectionDerug,
          chainCollectionData
        );
        if (derugNfts.length === 0) {
          toast.error("No NFTs from collection!");
          return;
        }

        await castDerugRequestVote(
          derugRequest,
          wallet!,
          collectionDerug,
          derugNfts
        );

        const updatedRequest = await getSingleDerugRequest(
          derugRequest.address
        );
        const addedRequests = [...(derugRequests ?? [])];
        const derugIndex = addedRequests.findIndex(
          (dr) => dr.address.toString() === derugRequest.address.toString()
        );
        addedRequests[derugIndex] = { ...updatedRequest };
        setRequests(addedRequests);
      } catch (error: any) {
        toast.error("Failed to vote:", error);
      } finally {
        toggleLoading(false);
      }
    }
  };

  return (
    <div
      className="flex w-full items-center py-2"
      style={{
        padding: "10px",
      }}
    >
      <div className="flex gap-3 items-center justify-start w-1/2	ml-7">
        <Balancer
          className="text-lg cursor-pointer text-white font-mono"
          onClick={() => {
            setIsOpen(true);
            setCurrentRequest(derugRequest);
          }}
        >
          <span style={{ fontSize: "1em", opacity: 0.7 }}>#{index + 1}</span>{" "}
          {""}{" "}
        </Balancer>
        <Balancer
          className="text-md cursor-pointer text-white font-mono truncate w-1/3"
          onClick={() => {
            setIsOpen(true);
            setCurrentRequest(derugRequest);
          }}
        >
          <span style={{ fontSize: "1em", opacity: 0.7 }}>
            {derugRequest.derugger.toString()}
          </span>{" "}
          {""}{" "}
        </Balancer>
        {derugRequest.utility &&
          derugRequest.utility.map((u, i) => (
            <Tooltip
              sx={{
                "::after": {
                  fontSize: "1em",
                  backgroundColor: "#282C34",
                },
              }}
              direction="n"
              aria-label={u.description}
              noDelay={true}
            >
              <div
                className="text-sm font-mono cursor-hderugRequestp"
                style={{
                  borderRightWidth:
                    i !== derugRequest.utility.length - 1 ? "1px" : "0px",
                  paddingRight:
                    i !== derugRequest.utility.length - 1 ? "1em" : "0px",
                  color: "rgb(9, 194, 246)",
                }}
              >
                {" "}
                {u.title}
              </div>
            </Tooltip>
          ))}
      </div>
      <div className="flex items-center justify-end w-1/2">
        {showVoteButton() && (
          <Button
            variant="invisible"
            sx={{ color: "rgba(9,194,246)" }}
            onClick={castVote}
          >
            {loading ? (
              <Oval color="rgb(9, 194, 246)" height={"2em"} />
            ) : (
              <p>Vote</p>
            )}
          </Button>
        )}

        {showClaimButton() && (
          <Button variant="invisible" sx={{ color: "rgba(9,194,246)" }}>
            Claim victory
          </Button>
        )}
        {showRemintButton() && (
          <Button variant="invisible" sx={{ color: "rgba(9,194,246)" }}>
            Remint
          </Button>
        )}

        <div className="relative">
          {collectionDerug && (
            <div
              className={`absolute w-[1px] h-[100%] bg-red-500`}
              style={{
                left: `${
                  (collectionDerug.thresholdDenominator /
                    collectionDerug.totalSupply) *
                  100
                }%`,
              }}
            />
          )}
          <ProgressBar
            progress={
              (derugRequest.voteCount / (collectionDerug?.totalSupply ?? 1)) *
              100
            }
            bg="#2DD4BF"
            sx={{
              width: "380px",
              height: "30px",
              borderRadius: 0,
              color: "rgb(45, 212, 191)",
              "@media (max-width: 768px)": {
                width: "200px",
              },
            }}
          />
        </div>
        <Balancer
          className="text-lg cursor-pointer text-white font-mono px-5"
          style={{ fontSize: "1em", opacity: 0.2 }}
        >
          <span
            style={{
              padding: "10px",
              fontSize: "0.75em",
            }}
          >
            {dayjs
              .unix(derugRequest.createdAt)
              .toDate()
              .toString()
              .slice(0, 10)}
          </span>
        </Balancer>
        <p
          style={{
            fontSize: "1.5em",
          }}
        >
          {derugRequest.voteCount} / {collectionDerug?.totalSupply}
        </p>
      </div>
    </div>
  );
};
export default DerugRequestItem;
