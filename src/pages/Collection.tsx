import { FC, useEffect, useRef, useState } from "react";
import { LeftPane } from "../components/CollectionLayout/LeftPane";
import { RightPane } from "../components/CollectionLayout/RightPane";
import { header } from "./../components/CollectionLayout/Header";
// import { Proposals } from "./../components/CollectionLayout/Proposals";
import {
  ICollectionData,
  ICollectionStats,
  ITrait,
} from "../interface/collections.interface";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  ACTIVE_LISTINGS_QUERY,
  FP_QUERY,
  MINTS_QUERY,
  MINTS_QUERY_C,
  TRAITS_QUERY,
} from "../api/graphql/query";
import { useSearchParams } from "react-router-dom";
import {
  mapCollectionListings,
  mapCollectionStats,
  mapTraitsQuery,
} from "../api/graphql/mapper";
import { getListedNfts } from "../api/collections.api";
import { Box } from "@primer/react";
import { HeaderTabs } from "../components/CollectionLayout/HeaderTabs";
import { collectionsStore } from "../stores/collectionsStore";

export const Collections: FC = () => {
  const { setListings, nftListings } = collectionsStore.getState();
  const [collection, setCollection] = useState<ICollectionStats>();
  const [traits, setTraits] = useState<ITrait[]>();
  const [selectedInfo, setSelectedInfo] = useState("description");
  const [selectedData, setSelectedData] = useState("traits");
  const iframeRef = useRef(null);
  const [params] = useSearchParams();

  const { data } = useQuery(TRAITS_QUERY, {
    variables: { slug: params.get("symbol") },
  });

  const collectionFpData = useQuery(FP_QUERY, {
    variables: { slug: params.get("symbol") },
  });

  useEffect(() => {
    if (data) {
      setTraits(mapTraitsQuery(data));
    }
  }, [data]);

  useEffect(() => {
    if (collectionFpData.data) {
      setCollection(mapCollectionStats(collectionFpData.data));
    }
  }, [collectionFpData]);

  const boxRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box className="overflow-y-auto">
      <Box className="sticky top-0 grid">
        {header(true, collection)}
        <HeaderTabs
          selectedInfo={selectedInfo}
          setSelectedInfo={setSelectedInfo}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
        />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
        <div
          ref={boxRef}
          className="ASDSAD"
          style={{
            maxHeight: "270em",
            overflow: "none",
          }}
        >
          {nftListings && (
            <LeftPane parentRef={boxRef} selectedInfo={selectedInfo} />
          )}
        </div>
        <Box
          sx={{
            maxHeight: "27em",
            overflow: "scroll",
          }}
        >
          <RightPane
            selectedData={selectedData}
            iframeRef={iframeRef}
            traits={traits}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Collections;
