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

export const FP_QUERY = gql`
  query Instrument($slug: String!) {
    instrumentTV2(slug: $slug) {
      ...ReducedInstrument
      __typename
    }
  }

  fragment ReducedInstrument on InstrumentTV2 {
    id
    slug
    slugDisplay
    tensorWhitelisted
    name
    symbol
    imageUri
    description
    website
    twitter
    discord
    tokenStandard
    sellRoyaltyFeeBPS
    stats {
      priceUnit
      floorPrice
      __typename
    }
    statsOverall {
      ...ReducedStats
      __typename
    }
    statsTSwap {
      numMints
      __typename
    }
    statsHSwap {
      nftsForSale
      solDeposited
      __typename
    }
    statsSwap {
      ...ReducedStatsSwap
      __typename
    }
    statsTHSwap {
      ...ReducedStatsSwap
      __typename
    }
    meFloorPrice
    firstListDate
    __typename
  }

  fragment ReducedStats on CollectionStats {
    priceUnit
    floorPrice
    numListed
    numMints
    sales1h
    sales24h
    sales7d
    volume1h
    volume24h
    volume7d
    floor1h
    floor24h
    floor7d
    pctListed
    marketCap
    __typename
  }

  fragment ReducedStatsSwap on ICollectionStatsSwap {
    priceUnit
    buyNowPrice
    sellNowPrice
    nftsForSale
    solDeposited
    sales1h
    sales24h
    sales7d
    volume1h
    volume24h
    volume7d
    __typename
  }
`;
