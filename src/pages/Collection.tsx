import { FC, useEffect, useRef, useState } from "react";
import { LeftPane } from "../components/CollectionLayout/LeftPane";
import { RightPane } from "../components/CollectionLayout/RightPane";
// import { Proposals } from "./../components/CollectionLayout/Proposals";
import {
  IChainCollectionData,
  ICollectionData,
  ICollectionRecentActivities,
  ICollectionStats,
  INftListing,
  ITrait,
} from "../interface/collections.interface";
import { useQuery } from "@apollo/client";
import {
  ACTIVE_LISTINGS_QUERY,
  FP_QUERY,
  TRAITS_QUERY,
} from "../api/graphql/query";

import { StickyHeader } from "../components/CollectionLayout/StickyHeader";
import { IRequest } from "../interface/collections.interface";
import { useSearchParams } from "react-router-dom";
import {
  mapCollectionListings,
  mapCollectionStats,
  mapNextData,
  mapTraitsQuery,
} from "../api/graphql/mapper";
import { Box } from "@primer/react";
import { CollectionContext } from "../stores/collectionContext";
import { getSingleCollection } from "../api/collections.api";
import { getCollectionChainData } from "../solana/collections";
import { HeaderTabs } from "../components/CollectionLayout/HeaderTabs";
import { Proposals } from "../components/CollectionLayout/Proposals";
import { AddDerugRequst } from "../components/CollectionLayout/AddDerugRequest";
import { collectionsStore } from "../stores/collectionsStore";

export const Collections: FC = () => {
  const [requests, setRequests] = useState<IRequest[]>();
  const [collectionStats, setCollectionStats] = useState<ICollectionStats>();

  const [derugRequestVisible, setDerugRequestVisible] = useState(false);
  const [traits, setTraits] = useState<ITrait[]>();
  const [selectedInfo, setSelectedInfo] = useState("description");
  const [selectedData, setSelectedData] = useState("traits");
  const [basicCollectionData, setBasicCollectionData] =
    useState<ICollectionData>();
  const [listings, setListings] = useState<INftListing[]>();
  const [chainCollectionData, setChainCollectionData] =
    useState<IChainCollectionData>();
  const [recentActivities, setRecentActivities] =
    useState<ICollectionRecentActivities[]>();

  const iframeRef = useRef(null);
  const slug = useSearchParams()[0].get("symbol");

  const { data } = useQuery(TRAITS_QUERY, {
    variables: { slug },
  });

  const collectionFpData = useQuery(FP_QUERY, {
    variables: { slug },
  });

  const activeListingsData = useQuery(ACTIVE_LISTINGS_QUERY, {
    variables: {
      slug,
      filters: null,
      sortBy: "PriceAsc",
      limit: 100,
    },
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
      console.log(collectionFpData.data);

      setCollectionStats(mapCollectionStats(collectionFpData.data));
    }
  }, [collectionFpData]);

  useEffect(() => {
    if (activeListingsData.data) {
      setListings(mapCollectionListings(activeListingsData.data));
    }
  }, [activeListingsData]);

  const getBasicCollectionData = async () => {
    try {
      setBasicCollectionData(await getSingleCollection(slug ?? ""));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (basicCollectionData) void getChainCollectionDetails();
  }, [basicCollectionData, listings]);

  const getChainCollectionDetails = async () => {
    try {
      setChainCollectionData(
        await getCollectionChainData(basicCollectionData!, listings?.at(0))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const boxRef = useRef<HTMLDivElement | null>(null);

  return (
    <CollectionContext.Provider
      value={{
        chainCollectionData,
        setChainCollectionData,
        activeListings: listings,
        setActiveListings: setListings,
        collection: basicCollectionData,
        setCollection: setBasicCollectionData,
        collectionStats,
        setCollectionStats,
        traits,
        setTraits,
        recentActivities,
        setRecentActivities,
      }}
    >
      <Box className="overflow-y-auto">
        <Box className="sticky top-0 grid"></Box>
        <Box className="overflow-y-clip">
          <AddDerugRequst
            isOpen={derugRequestVisible}
            setIsOpen={setDerugRequestVisible}
            derugRequests={requests}
            setDerugRequest={setRequests}
          />
          <Box className="sticky top-0 grid">
            <StickyHeader
              openDerugModal={setDerugRequestVisible}
              collection={collectionStats}
            />
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
                maxHeight: "27em",
                overflow: "none",
              }}
            >
              <LeftPane parentRef={boxRef} selectedInfo={selectedInfo} />
            </div>
            <Box
              sx={{
                maxHeight: "27em",
                overflowY: "scroll",
              }}
            >
              <RightPane
                selectedData={selectedData}
                traits={traits}
                iframeRef={undefined}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Proposals requests={requests} />
    </CollectionContext.Provider>
  );
};

export default Collections;
