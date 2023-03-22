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
          "9AiMvUTMiec1QfXb8ZJ1xUreNEuHu7nXpHb6g4YoFvtG"
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
      collectionMint: "9AiMvUTMiec1QfXb8ZJ1xUreNEuHu7nXpHb6g4YoFvtG",
      hasActiveDerugData,
      slug: "boogle_gen",
      totalSupply: 99,
      rugUpdateAuthority: "6tQd6yx45uWkMt3Bzk94a3oU3xjU3t8f7ZPTUqCBQVYK",
      derugDataAddress: derugData,
    };
  };
