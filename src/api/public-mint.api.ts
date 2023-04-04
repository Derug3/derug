import { Keypair } from "@solana/web3.js";
import { CandyMachineDto, INonMinted } from "../interface/derug.interface";
import { get, post } from "./request.api";
import { COLLECTION, NON_MINTED, PUBLIC_REMINT } from "./url.api";

export const saveCandyMachineData = async (
  candyMachineDto: CandyMachineDto
) => {
  return await post(PUBLIC_REMINT + "/save", candyMachineDto);
};

export const getCandyMachine = async (derugData: string) => {
  return await get(`${PUBLIC_REMINT}/${derugData}`);
};

export const getNonMinted = async (
  derugData: string
): Promise<INonMinted[]> => {
  return get(`${PUBLIC_REMINT}${NON_MINTED}/${derugData}`);
};

export const storeAllNfts = async (
  updateAuthority: string,
  derugData: string
) => {
  return get(`${PUBLIC_REMINT}${COLLECTION}/${updateAuthority}/${derugData}`);
};
