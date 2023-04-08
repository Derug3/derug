import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { ICollectionRecentActivities } from "../interface/collections.interface";
import { IRemintConfig } from "../interface/derug.interface";
import { derugProgramFactory, metaplex } from "../solana/utilities";
import { generateSkeletonArrays } from "../utilities/nft-fetching";
import { RPC_CONNECTION } from "../utilities/utilities";
import { ANCHOR_ERROR, ERROR_NUMBER } from "./constants";

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

export const getNftName = (totalReminted: number) => {
  let name = "#";
  for (let i = 0; i < 4 - totalReminted.toString().length; i++) {
    name += "0";
  }
  name += totalReminted.toString();

  return name;
};

export const getNftsFromDeruggedCollection = async (
  owner: PublicKey,
  remintConfig: IRemintConfig
) => {
  try {
    const collectionNfts: { image: string; name: string }[] = [];

    const nftss = await metaplex.nfts().findAllByOwner({
      owner: owner,
    });

    for (const nft of nftss) {
      try {
        if (
          nft.creators[0].address.toString() ===
          remintConfig.candyMachineCreator.toString()
        ) {
          collectionNfts.push({
            name: nft.name,
            image: (await (await fetch(nft.uri)).json()).image,
          });
        }
      } catch (error) {}
    }

    return collectionNfts;
  } catch (error: any) {
    console.log(error);

    toast.error("Failed to load minted NFTs:", error.message);
    return [];
  }
};

export const stringifyData = (candyMachineSecretKey: Uint8Array) => {
  let stringVal = "";

  candyMachineSecretKey.forEach((n) => (stringVal += n.toString() + ","));

  return stringVal;
};

export const parseKeyArray = (sc: string) => {
  const numbers = sc.split(",").filter((v) => v !== "");

  const arr: number[] = [];

  numbers.forEach((n) => {
    arr.push(Number(n));
  });

  return new Uint8Array(arr);
};

export const parseTransactionError = (data: any) => {
  const parsedData = JSON.parse(JSON.stringify(data));
  console.log(parsedData);
  const derugProgram = derugProgramFactory();

  if (
    parsedData.logs.find(
      (log: any) => log.includes("lamports") || log.includes("NotEnoughSOL")
    )
  ) {
    return "Insufficient balance for transaction";
  }

  const log = parsedData.logs.find((log: string) => log.includes(ANCHOR_ERROR));

  if (log) {
    const slicedData = +log.split(ERROR_NUMBER)[1].split(".")[0].trim();
    const err = derugProgram.idl.errors.find(
      (err) => err.code === slicedData
    )?.msg;

    return err;
  }
};
