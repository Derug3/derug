import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { ICollectionRecentActivities } from "../interface/collections.interface";
import { metaplex } from "../solana/utilities";
import { generateSkeletonArrays } from "../utilities/nft-fetching";
import { RPC_CONNECTION } from "../utilities/utilities";

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
  deruggedCollection: PublicKey
) => {
  try {
    const nfts = await RPC_CONNECTION.getParsedTokenAccountsByOwner(owner, {
      programId: TOKEN_PROGRAM_ID,
    });
    const collectionNfts: { image: string; name: string }[] = [];

    for (const nft of nfts.value) {
      try {
        const metadata = await Metadata.fromAccountAddress(
          RPC_CONNECTION,
          metaplex
            .nfts()
            .pdas()
            .metadata({
              mint: new PublicKey(nft.account.data.parsed.info.mint),
            })
        );
        if (
          metadata.collection &&
          metadata.collection.key.toString() === deruggedCollection.toString()
        ) {
          collectionNfts.push({
            image: (await (await fetch(metadata.data.uri)).json()).image,
            name: metadata.data.name,
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

export const getQuestionMarkPattern = () => {
  let data: boolean[][] = [];
  for (let i = 0; i < 11; i++) {
    const helperArr: boolean[] = [];
    for (let j = 0; j < 7; j++) {
      if (i == 0) {
        if (j >= 2 && j <= 4) helperArr.push(true);
        else helperArr.push(false);
      }
      if (i == 1) {
        if (j >= 1 && j <= 5) helperArr.push(true);
        else helperArr.push(false);
      }
      if (i == 2) {
        if (j !== 3) helperArr.push(true);
        else helperArr.push(false);
      }
      if (i == 3) {
        if (j < 2 || j > 4) helperArr.push(true);
        else helperArr.push(false);
      }
      if (i == 4) {
        if (j == 5 || j == 6) helperArr.push(true);
        else helperArr.push(false);
      }
      if (i == 5) {
        if (j == 4 || j == 5) helperArr.push(true);
        else helperArr.push(false);
      }
      if (i == 6) {
        if (j >= 2 && j <= 5) helperArr.push(true);
        else helperArr.push(false);
      }
      if (i == 7 || i == 9 || i == 10) {
        if (j == 2 || j == 3) helperArr.push(true);
        else helperArr.push(false);
      }
      if (i == 8) helperArr.push(false);
    }
    console.log(i, helperArr);

    data.push(helperArr);
  }
  return data;
};
