import React, { FC, useContext, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router-dom";
import { makeNextQuery } from "../../api/graphql/query";
import { CollectionContext } from "../../stores/collectionContext";
import { generateSkeletonArrays } from "../../utilities/nft-fetching";
import ListedNftItem from "./ListedNftItem";

const ListedNfts: FC = () => {
  const { activeListings, loading, toggleLoading, setActiveListings } =
    useContext(CollectionContext);

  const renderListedNfts = () => {
    console.log(activeListings?.length, "activeListings");

    return activeListings?.map((ln) => {
      return <ListedNftItem listedNft={ln} key={ln.mint} />;
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
        overflow: "none",
      }}
    >
      {!loading
        ? renderListedNfts()
        : generateSkeletonArrays(25).map((_, i) => (
            <Skeleton
              height={128}
              width={128}
              baseColor="rgb(22,27,34)"
              highlightColor="rgb(29,35,44)"
            />
          ))}
    </div>
  );
};

export default ListedNfts;
