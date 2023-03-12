import { useQuery } from "@apollo/client";
import { Box } from "@primer/react";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useSearchParams } from "react-router-dom";
import { mapCollectionListings, mapNextData } from "../../api/graphql/mapper";
import { ACTIVE_LISTINGS_QUERY, makeNextQuery } from "../../api/graphql/query";
import { INftListing } from "../../interface/collections.interface";
import ListedNftItem from "./ListedNftItem";

const ListedNfts: FC<{
  parentRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ parentRef }) => {
  const [params] = useSearchParams();
  const activeListingsData = useQuery(ACTIVE_LISTINGS_QUERY, {
    variables: {
      slug: params.get("symbol"),
      filters: null,
      sortBy: "PriceAsc",
      limit: 100,
    },
  });

  const [listedNfts, setListedNfts] = useState<INftListing[]>();
  const [loading, toggleLoading] = useState(false);
  const [hasMore, toggleHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string>();

  useEffect(() => {
    if (activeListingsData.data) {
      console.log(activeListingsData.data);

      setListedNfts(mapCollectionListings(activeListingsData.data));
      const { endCursor, hasMore } = mapNextData(activeListingsData.data);
      toggleHasMore(hasMore);
      setNextCursor(endCursor);
    }
  }, [activeListingsData]);

  const mapNewBatchOfNfts = async () => {
    try {
      const { nfts, nextQueryData } = await makeNextQuery(
        params.get("symbol")!,
        nextCursor!,
        100
      );
      setListedNfts((prevValue) => [...prevValue!, ...nfts]);
      toggleHasMore(nextQueryData.hasMore);
      setNextCursor(nextQueryData.endCursor);
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoading(false);
    }
  };

  const renderListedNfts = () => {
    return listedNfts?.map((ln) => {
      return <ListedNftItem listedNft={ln} key={ln.mint} />;
    });
  };

  return (
    <div style={{ height: "27em", overflowY: "scroll" }}>
      {listedNfts && (
        <InfiniteScroll
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: "1%",
            rowGap: "2%",
            overflow: "none",
          }}
          threshold={500}
          useWindow={false}
          hasMore={hasMore}
          loader={<p style={{ fontWeight: "bold" }}>Loading...</p>}
          loadMore={mapNewBatchOfNfts}
          getScrollParent={() => parentRef.current!}
        >
          {renderListedNfts()}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ListedNfts;
