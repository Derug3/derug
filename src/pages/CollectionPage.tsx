import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { mapTraitsQuery } from "../api/graphql/mappers";
import { TRAITS_QUERY } from "../api/graphql/query";
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

  return <div>CollectionPage</div>;
};

export default CollectionPage;
