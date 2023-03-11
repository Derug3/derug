import { ICollectionRecentActivities } from "../interface/collections.interface";

export const splitTimestamps = (
  recentCollections: ICollectionRecentActivities[]
) => {
  const result: ICollectionRecentActivities[][] = [];

  for (let month = 1; month <= 12; month++) {
    const filteredTimestamps = recentCollections.filter((value) => {
      const date = new Date(value.dateExecuted * 1000);
      return date.getMonth() + 1 === month;
    });
    if (filteredTimestamps.length > 0) {
      result.push(filteredTimestamps);
    }
  }

  const mappedValues: ICollectionRecentActivities[] = result.map((arr) => {
    return arr.sort((a, b) => a.price - b.price)[0];
  });

  return mappedValues;
};
