import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey } from "@solana/web3.js";
import { getMagicEdenListingsBySlug } from "../api/collections.api";
import {
  IChainCollectionData,
  ICollectionData,
  INftListing,
} from "../interface/collections.interface";
import {
  MAINNET_RPC_CONNECTION,
  METAPLEX_PROGRAM,
} from "../utilities/utilities";

export async function getCollectionChainData(
  collection: ICollectionData,
  listedNft?: INftListing | undefined
): Promise<IChainCollectionData> {
  let mint = listedNft?.mint;
  if (!mint) {
    const listings = await getMagicEdenListingsBySlug(collection.symbol);
    mint = listings[0].tokenMint;
  }

  if (!mint) {
    throw new Error("Failed to retrieve collection Metalpex data!");
  }

  const [metadata] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METAPLEX_PROGRAM.toBuffer(),
      new PublicKey(mint!).toBuffer(),
    ],
    METAPLEX_PROGRAM
  );

  const metadataAccount = await Metadata.fromAccountAddress(
    MAINNET_RPC_CONNECTION,
    metadata
  );

  if (!metadataAccount || !metadataAccount.data.creators)
    throw new Error("Failed to retrieve collection Metalpex data!");

  return {
    collectionMint: metadataAccount.collection
      ? metadataAccount.collection.key.toString()
      : metadataAccount?.data.creators
          .find((c) => c.share > 0)
          ?.address.toString() ??
        metadataAccount.data.creators[0].address.toString(),
    rugUpdateAuthority: metadataAccount.updateAuthority.toString(),
    slug: collection.symbol,
  };
}
