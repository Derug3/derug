import { IChainCollectionData } from "../interface/collections.interface";
import { PublicKey } from "@solana/web3.js";
import { derugDataSeed } from "./seeds";
import { derugProgramFactory } from "./utilities";
import { RPC_CONNECTION } from "../utilities/utilities";

// voting F7ehLXDAQqgWTQmxND3yEW6CxYMXh66PrM5g1DnMWjJ9
// winning 7mVFUBoaq5oSbBDbcSxYTu2HP6PYEhnzWFU6rL5tybqx
// no requests 9AiMvUTMiec1QfXb8ZJ1xUreNEuHu7nXpHb6g4YoFvtG

export const getDummyCollectionData =
  async (): Promise<IChainCollectionData> => {
    const derugProgram = derugProgramFactory();
    const [derugData] = PublicKey.findProgramAddressSync(
      [
        derugDataSeed,
        new PublicKey(
          "7FnYQKdwPLYJHYDqdxSbo7Ysm4P81wcYACK79GyYr9PL"
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
      collectionMint: "7FnYQKdwPLYJHYDqdxSbo7Ysm4P81wcYACK79GyYr9PL",
      hasActiveDerugData,
      slug: "boogle_gen",
      totalSupply: 99,
      rugUpdateAuthority: "6x1bmYkoPFs2oWjoRg7v4NAW4pzjxid2DVooyJmC4emH",
      derugDataAddress: derugData,
    };
  };
