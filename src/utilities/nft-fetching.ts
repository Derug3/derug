import { PublicKey } from "@solana/web3.js";
import {
  ICollectionRecentActivities,
  INftListing,
} from "../interface/collections.interface";
import {
  gqlClient,
  MAINNET_RPC_CONNECTION,
  METAPLEX_PROGRAM,
} from "./utilities";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { RECENT_ACTIVITIES_QUERY } from "../api/graphql/query";
import { TENSOR_LIST_FILTER } from "../common/constants";
import { mapRecentActivities } from "../api/graphql/mapper";
import dayjs from "dayjs";

export const generateSkeletonArrays = (quantity: number) => [
  ...Array(quantity).keys(),
];

export const fetchWhileHasActivities = async (
  firstBatch: ICollectionRecentActivities[],
  nextCursor: string,
  slug: string,
  txAt: number
) => {
  let response: any;
  do {
    response = await gqlClient.query({
      query: RECENT_ACTIVITIES_QUERY,
      variables: {
        filter: {
          txType: TENSOR_LIST_FILTER,
        },
        limit: 100,
        slug,
        cursor: {
          txKey: nextCursor,
          txAt,
        },
      },
    });

    nextCursor = response.data.recentTransactions.page.endCursor.txKey;
    txAt = response.data.recentTransactions.page.endCursor.txAt;
    firstBatch = [...firstBatch, ...mapRecentActivities(response.data)];
  } while (response && response.data.recentTransactions.page.hasMore);

  return firstBatch.sort((a, b) =>
    dayjs(a.dateExecuted).isAfter(b.dateExecuted) ? 1 : -1
  );
};
