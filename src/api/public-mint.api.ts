import { Keypair } from "@solana/web3.js";
import {
  CandyMachineDto,
  INonMinted,
  StoreCandyMachineData,
} from "../interface/derug.interface";
import { get, post } from "./request.api";
import {
  COLLECTION,
  GET,
  METADATA,
  NON_MINTED,
  PUBLIC_REMINT,
  SAVE,
  USER_MINT,
} from "./url.api";

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
  storeCandyMachine: StoreCandyMachineData
) => {
  return post(`${PUBLIC_REMINT}${COLLECTION}`, storeCandyMachine);
};

export const getPrivateMintNft = (metadata: string): Promise<INonMinted> => {
  return get(`${PUBLIC_REMINT}${METADATA}/${metadata}`);
};

export const saveUserMint = (userPubkey: string, candyMachine: string) => {
  return post(`${USER_MINT}${SAVE}`, {
    userPubkey: userPubkey,
    candyMachinePubkey: candyMachine,
  });
};

export const getUserMints = (userPubkey: string, candyMachine: string) => {
  return get(`${USER_MINT}${GET}/${candyMachine}/${userPubkey}`);
};
