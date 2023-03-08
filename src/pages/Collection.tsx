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
import { useQuery } from "@apollo/client";
import { FP_QUERY, TRAITS_QUERY } from "../api/graphql/query";
import { useSearchParams } from "react-router-dom";
import { mapCollectionStats, mapTraitsQuery } from "../api/graphql/mapper";
import { getListedNfts } from "../api/collections.api";
import { Box } from "@primer/react";
import { HeaderTabs } from "../components/CollectionLayout/HeaderTabs";

export const Collections: FC = () => {
  const [collection, setCollection] = useState<ICollectionStats>();
  const [listings, setListings] = useState<any[]>();
  const [traits, setTraits] = useState<ITrait[]>();
  const [selectedInfo, setSelectedInfo] = useState("description");
  const [selectedData, setSelectedData] = useState("traits");
  const iframeRef = useRef(null);
  const [params] = useSearchParams();

  const { data, loading } = useQuery(TRAITS_QUERY, {
    variables: { slug: params.get("symbol") },
  });

  const collectionFpData = useQuery(FP_QUERY, {
    variables: { slug: params.get("symbol") },
  });

  useEffect(() => {
    if (collectionFpData.data) {
      setCollection(mapCollectionStats(collectionFpData.data));
    }
  }, [collectionFpData]);

  useEffect(() => {
    void fetchiiing();
    if (data) {
      setTraits(mapTraitsQuery(data));
    }
  }, [data]);

  const fetchiiing = async () => {
    if (!params.get("symbol")) return;
    const nfts = await getListedNfts(params.get("symbol") as string);
    console.log(nfts, "nftss");

    setListings(nfts);
  };

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
        <Box
          sx={{
            maxHeight: "27em",
            overflow: "scroll",
          }}
        >
          <LeftPane selectedInfo={selectedInfo} listings={listings} />
        </Box>
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
