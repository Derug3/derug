import { FC, useEffect, useRef, useState } from "react";
import { pane } from "./../components/CollectionLayout/Pane";
import { Content } from "./../components/CollectionLayout/Content";
import { header } from "./../components/CollectionLayout/Header";
// import { Proposals } from "./../components/CollectionLayout/Proposals";
import { CollectionLayout } from "../components/CollectionLayout/CollectionLayout";
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

export const Collections: FC = () => {
  const [collection, setCollection] = useState<ICollectionStats>();
  const [listings, setListings] = useState<any[]>();
  const [traits, setTraits] = useState<ITrait[]>();
  const [selectedInfo, setSelectedInfo] = useState("description");
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
    <>
      {!loading ? (
        <CollectionLayout
          pane={pane(selectedInfo, setSelectedInfo, iframeRef, traits!)}
          content={Content(listings)}
          header={header(true, collection)}
          proposals={<div />}
        ></CollectionLayout>
      ) : (
        <></>
      )}
    </>
  );
};

export default Collections;
