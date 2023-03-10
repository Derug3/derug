import { FC, useEffect, useRef, useState } from "react";
import { LeftPane } from "../components/CollectionLayout/LeftPane";
import { RightPane } from "../components/CollectionLayout/RightPane";
import { header } from "./../components/CollectionLayout/Header";
// import { Proposals } from "./../components/CollectionLayout/Proposals";
import {
  ICollectionData,
  ICollectionStats,
  INftListing,
  ITrait,
} from "../interface/collections.interface";
import { useQuery } from "@apollo/client";
import { FP_QUERY, TRAITS_QUERY } from "../api/graphql/query";
import { useSearchParams } from "react-router-dom";
import { mapCollectionStats, mapTraitsQuery } from "../api/graphql/mapper";
import { Box } from "@primer/react";
import { HeaderTabs } from "../components/CollectionLayout/HeaderTabs";
import { collectionsStore } from "../stores/collectionsStore";
import { CollectionContext } from "../stores/collectionContext";
import { getSingleCollection } from "../api/collections.api";

export const Collections: FC = () => {
  const [collectionStats, setCollectionStats] = useState<ICollectionStats>();
  const [traits, setTraits] = useState<ITrait[]>();
  const [selectedInfo, setSelectedInfo] = useState("description");
  const [selectedData, setSelectedData] = useState("traits");
  const [basicCollectionData, setBasicCollectionData] =
    useState<ICollectionData>();
  const [listings, setListings] = useState<INftListing[]>();
  const iframeRef = useRef(null);
  const slug = useSearchParams()[0].get("symbol");

  const { data } = useQuery(TRAITS_QUERY, {
    variables: { slug },
  });

  const collectionFpData = useQuery(FP_QUERY, {
    variables: { slug },
  });

  useEffect(() => {
    void getBasicCollectionData();
  }, []);

  useEffect(() => {
    if (data) {
      setTraits(mapTraitsQuery(data));
    }
  }, [data]);

  useEffect(() => {
    if (collectionFpData.data) {
      setCollectionStats(mapCollectionStats(collectionFpData.data));
    }
  }, [collectionFpData]);

  const getBasicCollectionData = async () => {
    try {
      setBasicCollectionData(await getSingleCollection(slug ?? ""));
    } catch (error) {
      console.log(error);
    }
  };

  const boxRef = useRef<HTMLDivElement | null>(null);

  return (
    <CollectionContext.Provider
      value={{
        activeListings: listings,
        setActiveListings: setListings,
        collection: basicCollectionData,
        setCollection: setBasicCollectionData,
        collectionStats,
        setCollectionStats,
        traits,
        setTraits,
      }}
    >
      <Box className="overflow-y-auto">
        <Box className="sticky top-0 grid">
          {header(true, collectionStats)}
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
            <LeftPane parentRef={boxRef} selectedInfo={selectedInfo} />
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
    </CollectionContext.Provider>
  );
};

export default Collections;
