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
  return get(`${PUBLIC_REMINT}${COLLECTION}${NON_MINTED}/${derugData}`);
};
