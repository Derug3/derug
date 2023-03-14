import { FC, useEffect, useMemo, useRef, useState } from "react";
import { LeftPane } from "../components/CollectionLayout/LeftPane";
import { RightPane } from "../components/CollectionLayout/RightPane";
// import { Proposals } from "./../components/CollectionLayout/Proposals";
import {
  IChainCollectionData,
  ICollectionData,
  ICollectionDerugData,
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
import Marqee from "react-fast-marquee";

import { StickyHeader } from "../components/CollectionLayout/StickyHeader";
import { IRequest } from "../interface/collections.interface";
import { useSearchParams } from "react-router-dom";
import {
  mapCollectionListings,
  mapCollectionStats,
  mapNextData,
  mapTraitsQuery,
} from "../api/graphql/mapper";
import { Box, Button, Dialog } from "@primer/react";
import { CollectionContext } from "../stores/collectionContext";
import { getSingleCollection } from "../api/collections.api";
import { HeaderTabs } from "../components/CollectionLayout/HeaderTabs";
import { AddDerugRequst } from "../components/CollectionLayout/AddDerugRequest";
import { getCollectionDerugData } from "../solana/methods/derug";
import { getDummyCollectionData } from "../solana/dummy";
import { useWallet } from "@solana/wallet-adapter-react";
import { getAllDerugRequest } from "../solana/methods/derug-request";
import DerugRequest from "../components/DerugRequest/DerugRequest";
import { DerugStatus } from "../enums/collections.enums";
import dayjs from "dayjs";
import { Remint } from "../components/Remit/Remint";

import { toast } from "react-hot-toast";
import { getFloorPrice, getListings, getTraits } from "../api/tensor";
export const Collections: FC = () => {
  const [collectionStats, setCollectionStats] = useState<ICollectionStats>();

  const [derugRequestVisible, setDerugRequestVisible] = useState(false);
  const [traits, setTraits] = useState<ITrait[]>();
  const [selectedInfo, setSelectedInfo] = useState("description");
  const [selectedData, setSelectedData] = useState("listed");
  const [basicCollectionData, setBasicCollectionData] =
    useState<ICollectionData>();
  const [listings, setListings] = useState<INftListing[]>();
  const [chainCollectionData, setChainCollectionData] =
    useState<IChainCollectionData>();
  const [recentActivities, setRecentActivities] =
    useState<ICollectionRecentActivities[]>();
  const [collectionDerug, setCollectionDerug] =
    useState<ICollectionDerugData>();
  const [derugRequests, setDerugRequests] = useState<IRequest[]>();
  const iframeRef = useRef(null);
  const returnFocusRef = useRef(null);
  const slug = useSearchParams()[0].get("symbol");
  const [isOpen, setIsOpen] = useState(true);

  const wallet = useWallet();

  useEffect(() => {
    void getBasicCollectionData();
  }, []);

  const getBasicCollectionData = async () => {
    try {
      setBasicCollectionData(await getSingleCollection(slug ?? ""));
      if (slug) {
        setCollectionStats(await getFloorPrice(slug));
        setListings(await getListings(slug));
        setTraits(await getTraits(slug));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (basicCollectionData) void getChainCollectionDetails();
  }, [basicCollectionData, listings]);

  const getChainCollectionDetails = async () => {
    try {
      // const chainDetails = await getCollectionChainData(
      //   basicCollectionData!,
      //   listings?.at(0)
      // );
      const chainDetails = await getDummyCollectionData();

      setChainCollectionData(chainDetails);
      if (chainDetails.hasActiveDerugData) {
        setCollectionDerug(
          await getCollectionDerugData(chainDetails.derugDataAddress)
        );
        setDerugRequests(
          await getAllDerugRequest(chainDetails.derugDataAddress)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWinningRequest = useMemo(() => {
    return derugRequests?.sort((a, b) => a.voteCount - b.voteCount)[
      derugRequests.length - 1
    ];
  }, [derugRequests]);

  const shouldShowWinningModal = (status?: DerugStatus) => {
    if (
      derugRequests &&
      derugRequests.some(
        (el) => el.derugger.toString() === wallet.publicKey?.toString()
      ) &&
      getWinningRequest &&
      status === DerugStatus.Voting
    ) {
      setIsOpen(true);
      return true;
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
        collectionDerug,
        setCollectionDerug,
        derugRequests,
        setRequests: setDerugRequests,
      }}
    >
      <Box className="overflow-y-auto mt-16">
        <Box className="sticky top-0 grid "></Box>
        <Box className="overflow-y-clip">
          <AddDerugRequst
            isOpen={derugRequestVisible}
            setIsOpen={setDerugRequestVisible}
            derugRequests={derugRequests}
            setDerugRequest={setDerugRequests}
          />
          <Box className="sticky top-0 grid">
            <HeaderTabs
              setSelectedInfo={setSelectedInfo}
              selectedData={selectedData}
              setSelectedData={setSelectedData}
              openDerugModal={setDerugRequestVisible}
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "50% 50%",
              height: "400px",
            }}
          >
            <div
              ref={boxRef}
              className="ASDSAD"
              style={{
                maxHeight: "27em",
                transform: "translateY(-42px)",
                overflow: "none",
              }}
            >
              <LeftPane selectedInfo={selectedInfo} />
            </div>
            <Box
              sx={{
                maxHeight: "27em",
                overflowY: "scroll",
                marginLeft: "2em",
              }}
            >
              <RightPane
                selectedData={selectedData}
                chainCollectionData={chainCollectionData}
                parentRef={boxRef}
                traits={traits}
                iframeRef={iframeRef}
              />
            </Box>
          </Box>
          <Marqee
            pauseOnClick
            loop={0}
            speed={30}
            direction={"right"}
            gradient={false}
            style={{
              position: "absolute",
              left: "16%",
              top: "32px",
              width: "65%",
            }}
          >
            <StickyHeader
              collection={collectionStats}
              collectionDerug={collectionDerug}
              wallet={wallet}
              openDerugModal={setDerugRequestVisible}
            />
          </Marqee>
        </Box>
      </Box>
      {/* <DerugRequest openDerugModal={setDerugRequestVisible} /> */}
      {collectionDerug && (
        <>
          {(collectionDerug.status === DerugStatus.Initialized ||
            collectionDerug.status === DerugStatus.Voting) &&
          dayjs
            .unix(collectionDerug.votingStartedAt)
            .add(3, "minutes")
            .isAfter(dayjs()) ? (
            <DerugRequest openDerugModal={setDerugRequestVisible} />
          ) : (
            <>
              {collectionDerug && derugRequests && (
                <Remint getWinningRequest={getWinningRequest} />
              )}
            </>
          )}
        </>
      )}
    </CollectionContext.Provider>
  );
};

export default Collections;
