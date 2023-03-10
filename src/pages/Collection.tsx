import { FC, useEffect, useRef, useState } from "react";
import { LeftPane } from "../components/CollectionLayout/LeftPane";
import { RightPane } from "../components/CollectionLayout/RightPane";
import { StickyHeader } from "../components/CollectionLayout/StickyHeader";
import { IRequest } from "../interface/collections.interface";
import { ICollectionStats, ITrait } from "../interface/collections.interface";
import { useLazyQuery, useQuery } from "@apollo/client";
import { FP_QUERY, TRAITS_QUERY } from "../api/graphql/query";
import { useSearchParams } from "react-router-dom";
import { mapCollectionStats, mapTraitsQuery } from "../api/graphql/mapper";
import { Box } from "@primer/react";
import { HeaderTabs } from "../components/CollectionLayout/HeaderTabs";
import { Proposals } from "../components/CollectionLayout/Proposals";
import { AddDerugRequst } from "../components/CollectionLayout/AddDerugRequest";
import { collectionsStore } from "../stores/collectionsStore";

export const Collections: FC = () => {
  const [collection, setCollection] = useState<ICollectionStats>();
  const [requests, setRequests] = useState<IRequest[]>();

  const [derugRequestVisible, setDerugRequestVisible] = useState(false);
  const [description, setDescription] = useState<string>();
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
      console.log(collectionFpData, "collectionFpData");
      setDescription(collectionFpData.data.instrumentTV2.description);

      setCollection(mapCollectionStats(collectionFpData.data));
    }
  }, [collectionFpData]);

  const boxRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box className="overflow-y-auto">
      <AddDerugRequst
        isOpen={derugRequestVisible}
        setIsOpen={setDerugRequestVisible}
        derugRequests={requests}
        setDerugRequest={setRequests}
      />
      <Box className="sticky top-0 grid">
        <StickyHeader
          openDerugModal={setDerugRequestVisible}
          collection={collection}
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
          <LeftPane
            parentRef={boxRef}
            selectedInfo={selectedInfo}
            description={description}
          />
        </div>
        <Box
          sx={{
            maxHeight: "27em",
            overflowY: "scroll",
          }}
        >
          <RightPane
            selectedData={selectedData}
            iframeRef={iframeRef}
            traits={traits}
          />
        </Box>
      </Box>
      <Proposals requests={requests} />
    </Box>
  );
};

export default Collections;
