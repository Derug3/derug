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
const Remint = () => {
  const { derugRequests } = useContext(CollectionContext);
  const [collectionNfts, setCollectionNfts] = useState<IDerugCollectionNft[]>();
  const [loading, toggleLoading] = useState(true);

  const { collectionDerug, chainCollectionData } =
    useContext(CollectionContext);

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
        nfts[0] = { ...nfts[0], isReminting: true };
        nfts[1] = { ...nfts[1], reminted: true };
        nfts[2] = { ...nfts[2], remintingFailed: true };
        setCollectionNfts(nfts);
      }
    } catch (error: any) {
      console.log(error);

      toast.error(error.message);
    } finally {
      toggleLoading(false);
    }
  };

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

  return (
    <Box
      className="w-full py-2 flex-col gap-10"
      sx={{ p: 0, padding: "0.5em 1.5em", margin: "3em 0" }}
    >
      <WinningRequest request={getWinningRequest!} />
      <Box className="flex flex-col items-center gap-10 w-full mt-10">
        {!loading && collectionNfts && collectionNfts?.length > 0 && (
          <Button
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
    </Box>
  );
};

export default Remint;
