import { useQuery } from "@apollo/client";
import { Box } from "@primer/react";
import React, {
  FC,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useSearchParams } from "react-router-dom";
import { ACTIVE_LISTINGS_QUERY, makeNextQuery } from "../../api/graphql/query";
import { CollectionContext } from "../../stores/collectionContext";
import ListedNftItem from "./ListedNftItem";

const ListedNfts: FC<{
  parentRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ parentRef }) => {
  const { activeListings, setActiveListings } = useContext(CollectionContext);
  const [params] = useSearchParams();

  const [loading, toggleLoading] = useState(false);
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
    <div style={{ height: "27em", overflow: "scroll" }}>
      {activeListings && (
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
