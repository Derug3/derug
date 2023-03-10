import { ICollectionData } from "../interface/collections.interface";
import { get } from "./request.api";
import {
  COLLECTIONS,
  MAGIC_EDEN_COLLECTIONS,
  NAME,
  RANDOM,
  SYMBOL,
} from "./url.api";

export async function getRandomCollections(): Promise<ICollectionData[]> {
  return get(`${MAGIC_EDEN_COLLECTIONS}${RANDOM}`);
}

export async function getByNameOrSlug(
  name: string
): Promise<ICollectionData[]> {
  return get(`${MAGIC_EDEN_COLLECTIONS}${NAME}/${name}`);
}

export async function getSingleCollection(
  symbol: string
): Promise<ICollectionData> {
  return get(`${MAGIC_EDEN_COLLECTIONS}${SYMBOL}/${symbol}`);
}
