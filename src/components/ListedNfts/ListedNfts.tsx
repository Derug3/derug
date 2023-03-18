import React, { FC, useContext, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router-dom";
import { makeNextQuery } from "../../api/graphql/query";
import { CollectionContext } from "../../stores/collectionContext";
import { generateSkeletonArrays } from "../../utilities/nft-fetching";
import ListedNftItem from "./ListedNftItem";

const ListedNfts: FC<{
  parentRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ parentRef }) => {
  const { activeListings, loading, toggleLoading, setActiveListings } =
    useContext(CollectionContext);
  const [params] = useSearchParams();

  const [hasMore, toggleHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string>();

  const mapNewBatchOfNfts = async () => {
    try {
      const { nfts, nextQueryData } = await makeNextQuery(
        params.get("symbol")!,
        nextCursor!,
        100
      );
      const newListings = [...(activeListings ?? []), ...nfts];
      setActiveListings(newListings);
      toggleHasMore(nextQueryData.hasMore);
      setNextCursor(nextQueryData.endCursor);
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoading(false);
    }
  };

  const renderListedNfts = () => {
    return activeListings?.map((ln) => {
      return <ListedNftItem listedNft={ln} key={ln.mint} />;
    });
  };

  return (
    <div
      className="flex w-full justify-between items-center flex-wrap"
      style={{
        height: "27em",
        overflow: "scroll",
        width: "100%",
      }}
    >
      {activeListings && (
        <InfiniteScroll
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
            overflow: "none",
          }}
          threshold={500}
          useWindow={false}
          hasMore={hasMore}
          loader={<p style={{ fontWeight: "bold" }}>Loading...</p>}
          loadMore={mapNewBatchOfNfts}
          getScrollParent={() => parentRef.current!}
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
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ListedNfts;
