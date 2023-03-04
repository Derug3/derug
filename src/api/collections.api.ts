import { ICollectionData } from "../interface/collections.interface";
import { get } from "./request.api";
import { COLLECTIONS, MAGIC_EDEN_COLLECTIONS, RANDOM } from "./url.api";

export async function getRandomCollections(): Promise<ICollectionData[]> {
  return get(`${MAGIC_EDEN_COLLECTIONS}${RANDOM}`);
}
