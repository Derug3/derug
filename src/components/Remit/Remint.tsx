import { IRequest } from "../../interface/collections.interface";
import { Box, Button } from "@primer/react";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { FC, useContext, useEffect, useMemo, useState } from "react";
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
import { remintNft } from "../../solana/methods/remint";
import { chunk } from "lodash";
import nftStore from "../../stores/nftStore";
import { Oval } from "react-loader-spinner";
export const Remint: FC<{
  getWinningRequest: IRequest | undefined;
}> = ({ getWinningRequest }) => {
  const { derugRequests } = useContext(CollectionContext);
  const [collectionNfts, setCollectionNfts] = useState<IDerugCollectionNft[]>();
  const [loading, toggleLoading] = useState(true);

  const [isReminting, toggleIsReminting] = useState(false);

  const { collectionDerug, chainCollectionData } =
    useContext(CollectionContext);

  const { nfts, setNfts } = nftStore();

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

  const remintNfts = async () => {
    try {
      toggleIsReminting(true);
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

        if (collectionNfts.length > 10) {
          const chunkedNfts = chunk(collectionNfts, 10);
          for (const collectionChunk of chunkedNfts) {
            await remintNft(
              wallet!,
              collectionDerug,
              winningRequest,
              collectionChunk?.filter((nft) => !nft.remintingStatus)
            );
          }
        } else {
          await remintNft(
            wallet!,
            collectionDerug,
            winningRequest,
            collectionNfts?.filter((nft) => !nft.remintingStatus)
          );
        }
      }
    } catch (error) {
      console.log(error);

      setCollectionNfts(
        collectionNfts?.map((cnft) => {
          if (cnft.remintingStatus) {
            return { ...cnft, remintingStatus: undefined };
          } else {
            return { ...cnft };
          }
        })
      );
    } finally {
      toggleLoading(false);
      toggleIsReminting(false);
    }
  };

  const showRemintButton = useMemo(() => {
    return (
      collectionNfts?.filter(
        (cnft) =>
          !cnft.remintingStatus ||
          cnft.remintingStatus !== RemintingStatus.Failed
      ).length ?? 0 > 0
    );
  }, [collectionNfts]);

  return (
    <Box className="w-full flex-col gap-10">
      <WinningRequest request={getWinningRequest!} />
      {collectionDerug && collectionDerug.status === DerugStatus.Reminting && (
        <Box className="flex flex-col items-center gap-10 w-full mt-10">
          {!loading &&
            collectionNfts &&
            collectionNfts?.length > 0 &&
            showRemintButton && (
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
                {!isReminting ? (
                  <p>Remint</p>
                ) : (
                  <Oval color="black" width={"1.5em"} secondaryColor="blue" />
                )}
              </Button>
            )}
          <Box className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 px-10 ">
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
