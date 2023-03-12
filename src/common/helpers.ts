import dayjs from "dayjs";
import { ICollectionRecentActivities } from "../interface/collections.interface";

export const splitTimestamps = (
  recentCollections: ICollectionRecentActivities[]
) => {
  const result: ICollectionRecentActivities[][] = [];

  for (let i = 0; i < recentCollections.length; i++) {
    let j = i + 1;
    while (
      dayjs.unix(recentCollections[j].dateExecuted) <
      dayjs.unix(recentCollections[i].dateExecuted).add(1, "month")
    ) {
      j++;
    }
    result.push(recentCollections.slice(i, j));
    i = j;
  }

  return result;
};
