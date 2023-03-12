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
          "HUxWyo9a5uTxzLdSSY1LVsndnHfYkJhkRoP51ghLYEs7"
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
      collectionMint: "HUxWyo9a5uTxzLdSSY1LVsndnHfYkJhkRoP51ghLYEs7",
      hasActiveDerugData,
      slug: "solana_monkey_business",
      totalSupply: 5000,
      rugUpdateAuthority: "KQ1jcFYvnH9DNUzBfVbquRohP9uZ6C7DVJJDyqiGB4P",
      derugDataAddress: derugData,
    };
  };
