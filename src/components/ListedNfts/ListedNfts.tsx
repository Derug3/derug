import { Box } from "@primer/react";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { INftListing } from "../../interface/collections.interface";
import { collectionsStore } from "../../stores/collectionsStore";
import { NFTS_PER_PAGE } from "../../utilities/constants";
import ListedNftItem from "./ListedNftItem";

const ListedNfts: FC<{
  parentRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ parentRef }) => {
  const { nftListings } = collectionsStore.getState();

  const [listedNfts, setListedNfts] = useState<INftListing[]>();
  const [loading, toggleLoading] = useState(false);
  const [page, setPage] = useState(1);

  const parentScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    void mapNewBatchOfNfts();
  }, []);

  const mapNewBatchOfNfts = async () => {
    try {
      if (!loading) {
        toggleLoading(true);
        // const nftBatc = await fetchNftMetadatas(
        //   nftListings.slice(page * NFTS_PER_PAGE, (page + 1) * NFTS_PER_PAGE)
        // );

        // const addedNfts = [...(listedNfts ?? [])];
        // nftBatc.forEach((it) => addedNfts.push(it));
        // setListedNfts(addedNfts);
        // console.log("SETTING PAGE");

        setPage((prevValue) => prevValue + 1);
      }
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
    <div style={{ height: "27em", overflow: "scroll" }}>
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
          hasMore={listedNfts.length < nftListings.length}
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
