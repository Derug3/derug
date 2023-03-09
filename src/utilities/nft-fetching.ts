import { PublicKey } from "@solana/web3.js";
import { INftListing } from "../interface/collections.interface";
import { MAINNET_RPC_CONNECTION, METAPLEX_PROGRAM } from "./utilities";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
// export async function fetchNftMetadatas(
//   listedNfts: INftListing[]
// ): Promise<IListedNft[]> {
//   try {
//     const nftListings: IListedNft[] = [];
//     const mints = listedNfts.map(
//       (ln) =>
//         PublicKey.findProgramAddressSync(
//           [
//             Buffer.from("metadata"),
//             METAPLEX_PROGRAM.toBuffer(),
//             new PublicKey(ln.mint).toBuffer(),
//           ],
//           METAPLEX_PROGRAM
//         )[0]
//     );
//     const mintAccountInfos =
//       await MAINNET_RPC_CONNECTION.getMultipleAccountsInfo(mints);
//     for (const [index, account] of mintAccountInfos.entries()) {
//       if (!account) continue;
//       try {
//         const [metadataAccount] = Metadata.fromAccountInfo(account);
//         const nftImage = await (await fetch(metadataAccount.data.uri)).json();
//         nftListings.push({
//           imageUrl: nftImage.image,
//           mint: mints[index].toString(),
//           name: metadataAccount.data.name,
//           price: listedNfts[index].price,
//           soruce: listedNfts[index].soruce,
//         });
//       } catch (error) {
//         continue;
//       }
//     }

//     return nftListings;
//   } catch (error) {
//     console.log(error);

//     return [];
//   }
// }

export const generateSkeletonArrays = (quantity: number) => [
  ...Array(quantity).keys(),
];
