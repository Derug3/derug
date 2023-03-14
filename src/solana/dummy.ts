import { IChainCollectionData } from "../interface/collections.interface";
import { PublicKey } from "@solana/web3.js";
import { derugDataSeed } from "./seeds";
import { derugProgramFactory } from "./utilities";
import { RPC_CONNECTION } from "../utilities/utilities";
export const getDummyCollectionData =
  async (): Promise<IChainCollectionData> => {
    const derugProgram = derugProgramFactory();
    const [derugData] = PublicKey.findProgramAddressSync(
      [
        derugDataSeed,
        new PublicKey(
          "Ez7Zg8YPxnD1wBAFqX9wsAAYk2X1sKDV43cRGi9aeEWJ"
        ).toBuffer(),
      ],
      derugProgram.programId
    );

    let hasActiveDerugData = false;

    try {
      const derugDataAccount = await RPC_CONNECTION.getAccountInfo(derugData);
      if (derugDataAccount && derugDataAccount.data.length > 0) {
        hasActiveDerugData = true;
      }
    } catch (error) {
      hasActiveDerugData = false;
    }

    return {
      collectionMint: "Ez7Zg8YPxnD1wBAFqX9wsAAYk2X1sKDV43cRGi9aeEWJ",
      hasActiveDerugData,
      slug: "boogle_gen_1",
      totalSupply: 99,
      rugUpdateAuthority: "KQ1jcFYvnH9DNUzBfVbquRohP9uZ6C7DVJJDyqiGB4P",
      derugDataAddress: derugData,
    };
  };
