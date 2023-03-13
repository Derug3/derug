import { Box, Button } from "@primer/react";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { IDerugCollectionNft } from "../../interface/derug.interface";
import { CollectionContext } from "../../stores/collectionContext";
import {
  generateSkeletonArrays,
  getAllNftsFromCollection,
} from "../../utilities/nft-fetching";
import WinningRequest from "../DerugRequest/WinningRequest";
import { toast } from "react-hot-toast";
import RemintNft from "./RemintNft";
import Skeleton from "react-loading-skeleton";
import { DerugStatus, RemintingStatus } from "../../enums/collections.enums";
import { nftStore } from "../../stores/nftStore";
import { remintNft } from "../../solana/methods/remint";
const Remint = () => {
  const { derugRequests } = useContext(CollectionContext);
  const [collectionNfts, setCollectionNfts] = useState<IDerugCollectionNft[]>();
  const [loading, toggleLoading] = useState(true);

  const { collectionDerug, chainCollectionData } =
    useContext(CollectionContext);

  const { nfts, setNfts } = nftStore.getState();

  const wallet = useWallet();

  useEffect(() => {
    void getCollectionNfts();
  }, [wallet.publicKey]);

  const getCollectionNfts = async () => {
    try {
      if (
        wallet &&
        wallet.publicKey &&
        collectionDerug &&
        chainCollectionData
      ) {
        const nfts = await getAllNftsFromCollection(
          wallet,
          collectionDerug,
          chainCollectionData
        );

        setCollectionNfts(nfts);
      }
    } catch (error: any) {
      console.log(error);

      toast.error(error.message);
    } finally {
      toggleLoading(false);
    }
  };

  useEffect(() => {
    if (nfts.length > 0 && collectionNfts && collectionNfts?.length > 0) {
      const ruggedNfts = [...collectionNfts];
      nfts.forEach((nft) => {
        const nftIndex = ruggedNfts.findIndex(
          (nf) => nf.mint.toString() === nft.mint.toString()
        );
        ruggedNfts[nftIndex] = {
          ...ruggedNfts[nftIndex],
          remintingStatus: nft.status,
        };
      });

      setCollectionNfts(ruggedNfts);
    }
  }, [nfts]);

  const renderCollectionNfts = useMemo(() => {
    return collectionNfts?.map((cnft) => {
      return <RemintNft nft={cnft} key={cnft.mint.toString()} />;
    });
  }, [collectionNfts]);

  const getWinningRequest = useMemo(() => {
    return derugRequests?.sort((a, b) => a.voteCount - b.voteCount)[
      derugRequests.length - 1
    ];
  }, [derugRequests]);

  const remintNfts = async () => {
    try {
      const winningRequest = derugRequests?.sort(
        (a, b) => a.voteCount - b.voteCount
      )[derugRequests.length - 1];
      if (
        wallet &&
        collectionDerug &&
        collectionNfts &&
        collectionDerug?.status === DerugStatus.Reminting &&
        winningRequest
      ) {
        setNfts([]);
        setCollectionNfts(
          collectionNfts?.map((cnft) => {
            return { ...cnft, remintingStatus: RemintingStatus.InProgress };
          })
        );

        await remintNft(
          wallet!,
          collectionDerug,
          winningRequest,
          collectionNfts?.filter((nft) => !nft.remintingStatus)
        );
      }
    } catch (error) {
      setCollectionNfts(
        collectionNfts?.map((cnft) => {
          if (cnft.remintingStatus) {
            return { ...cnft, remintingStatus: undefined };
          } else {
            return { ...cnft };
          }
        })
      );
    }
  };

  return (
    <Box
      className="w-full py-2 flex-col gap-10"
      sx={{ p: 0, padding: "0.5em 1.5em", margin: "3em 0" }}
    >
      <WinningRequest request={getWinningRequest!} />
      {collectionDerug && collectionDerug.status === DerugStatus.Reminting && (
        <Box className="flex flex-col items-center gap-10 w-full mt-10">
          {!loading && collectionNfts && collectionNfts?.length > 0 && (
            <Button
              onClick={remintNfts}
              sx={{
                background: "rgb(9, 194, 246)",
                borderRadius: "4px",
                color: "black",
                fontWeight: "bold",
                border: "1px solid none",
                fontSize: "1.5em",
                padding: "1em 2em",
                fontFamily: "monospace",
                "&:hover": {
                  border: "1px solid rgb(9, 194, 246)",
                  background: "transparent",
                  color: "rgb(9, 194, 246)",
                },
              }}
            >
              Remint
            </Button>
          )}
          <Box className="grid grid-cols-8 gap-5 ">
            {loading ? (
              <>
                {generateSkeletonArrays(5).map(() => {
                  return <Skeleton baseColor="red" />;
                })}
              </>
            ) : (
              <>{renderCollectionNfts}</>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Remint;
