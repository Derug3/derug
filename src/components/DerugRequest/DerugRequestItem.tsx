import { Button, ProgressBar } from "@primer/react";
import { useWallet } from "@solana/wallet-adapter-react";
import dayjs from "dayjs";
import { index } from "mathjs";
import React, { FC, useContext } from "react";
import Balancer from "react-wrap-balancer";
import { IRequest } from "../../interface/collections.interface";
import {
  castDerugRequestVote,
  getSingleDerugRequest,
} from "../../solana/methods/derug-request";
import { CollectionContext } from "../../stores/collectionContext";
import { getAllNftsFromCollection } from "../../utilities/nft-fetching";
import { toast } from "react-hot-toast";
const DerugRequestItem: FC<{ derugRequest: IRequest; index: number }> = ({
  index,
  derugRequest,
}) => {
  const {
    collection,
    derugRequests,
    setRequests,
    collectionDerug,
    chainCollectionData,
  } = useContext(CollectionContext);

  const wallet = useWallet();

  const voteToDerugRequest = async () => {
    try {
      if (wallet && collectionDerug && chainCollectionData) {
        const nfts = await getAllNftsFromCollection(
          wallet,
          collectionDerug,
          chainCollectionData
        );

        await castDerugRequestVote(derugRequest, wallet, collectionDerug, nfts);
      }
      const updatedDerugRequest = await getSingleDerugRequest(
        derugRequest.address
      );
      const addedRequests = [...(derugRequests ?? [])];
      const index = addedRequests.findIndex(
        (dr) => dr.address.toString() === derugRequest.address.toString()
      );
      addedRequests[index] = { ...updatedDerugRequest };
      setRequests(addedRequests);
    } catch (error: any) {
      console.log(error);

      toast.error("Failed to vote:", error.message);
    }
  };

  return (
    <div
      className="flex  w-full items-center justify-around py-2"
      style={{
        borderRadius: "4px",
        padding: "10px",
        background: "rgb(9, 194, 246,.15)",
      }}
    >
      <div className="flex gap-3 items-center">
        <Balancer
          className="text-lg cursor-pointer text-white font-mono"
          // onClick={() => {
          //   setIsOpen(true);
          //   setCurrentRequest(derugRequest);
          // }}
        >
          <span style={{ fontSize: "1em", opacity: 0.7 }}>#{index + 1}</span>{" "}
          {""}{" "}
        </Balancer>
        {derugRequest.utility &&
          derugRequest.utility.map((u, i) => (
            <div
              className="text-sm font-mono"
              style={{
                borderRightWidth:
                  i !== derugRequest.utility.length - 1 ? "1px" : "0px",
                paddingRight:
                  i !== derugRequest.utility.length - 1 ? "1em" : "0px",
                color: "rgb(9, 194, 246)",
                filter: "drop-shadow(white 0px 0px 3px)",
              }}
            >
              {u.title}
            </div>
          ))}
      </div>
      <div className="flex items-center">
        {wallet.publicKey && (
          <Button
            variant="invisible"
            sx={{ color: "rgba(9,194,246)" }}
            onClick={voteToDerugRequest}
          >
            Vote
          </Button>
        )}
        <ProgressBar
          progress={derugRequest.voteCount / (collection?.numMints ?? 1)}
          bg="rgba(9,194,246)"
          sx={{
            width: "280px",
            filter: "drop-shadow(white 0px 0px 3px)",
            height: "16px",
            borderRadius: 0,
            color: "rgb(179, 255, 174)",
          }}
        />
        <Balancer
          className="text-lg cursor-pointer text-white font-mono px-5"
          style={{ fontSize: "1em", opacity: 0.2 }}
        >
          <span
            style={{
              borderRadius: "4px",
              padding: "10px",
              background: "rgb(9, 194, 246,.15)",
              filter: "drop-shadow(#2dd4bf 0px 0px 10px)",
            }}
          >
            {dayjs
              .unix(derugRequest.createdAt)
              .toDate()
              .toString()
              .slice(0, 10)}
          </span>
        </Balancer>
        <p className="font-bold font-white-500 font-sm">
          {derugRequest.voteCount}/{chainCollectionData?.totalSupply}
        </p>
      </div>
    </div>
  );
};

export default DerugRequestItem;
