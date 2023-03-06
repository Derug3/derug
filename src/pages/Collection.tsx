import { FC, useEffect, useRef, useState } from "react";
import { pane } from "./../components/CollectionLayout/Pane";
import { content } from "./../components/CollectionLayout/Content";
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

export const Collections: FC = () => {
  const [collection, setCollection] = useState<ICollectionStats>();
  const [traits, setTraits] = useState<ITrait[]>();
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

  const [selectedInfo, setSelectedInfo] = useState("description");
  const [selected, setSelected] = useState("addnewproposal");
  const iframeRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setTraits(mapTraitsQuery(data));
    }
  }, [data]);

  return (
    <>
      {!loading ? (
        <CollectionLayout
          pane={pane(selectedInfo, setSelectedInfo, iframeRef, traits!)}
          content={content()}
          header={header(collection)}
          proposals={<div />}
        ></CollectionLayout>
      ) : (
        <></>
      )}
    </>
  );
};

export default Collections;
