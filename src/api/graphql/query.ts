import { gql } from "@apollo/client";

export const TRAITS_QUERY = gql`
  query CollTraits($slug: String!) {
    traits(slug: $slug) {
      ...ReducedCollectionTraitsRarities
      __typename
    }
  }
  fragment ReducedCollectionTraitsRarities on CollectionTraitsRarities {
    traitMeta
    traitActive
    numMints
    __typename
  }
`;
