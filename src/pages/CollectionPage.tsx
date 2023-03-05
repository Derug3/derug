import { useQuery } from "@apollo/client";
import { Box } from "@primer/react";
import React, { useEffect, useMemo, useState } from "react";
import { mapTraitsQuery } from "../api/graphql/mappers";
import { TRAITS_QUERY } from "../api/graphql/query";
import TraitItem from "../components/Traits/TraitItem";
import { ITrait } from "../interface/collections.interface";

const CollectionPage = () => {
  const slug = "degods";
  const { data, loading } = useQuery(TRAITS_QUERY, {
    variables: { slug },
  });

  const [traits, setTraits] = useState<ITrait[]>();

  useEffect(() => {
    if (data) {
      setTraits(mapTraitsQuery(data));
    }
  }, [data]);

  console.log(traits);

  const renderTraits = useMemo(() => {
    return traits?.map((t) => {
      return <TraitItem name={t.name} values={[]} />;
    });
  }, [traits]);

  return <Box>{!loading && <Box>{renderTraits}</Box>}</Box>;
};

export default CollectionPage;
