import { AnchorProvider, Program } from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { Keypair, PublicKey } from "@solana/web3.js";
import { DerugProgram, IDL } from "../solana/idl/derug_program";
import { DERUG_PROGRAM_ID, RPC_CONNECTION } from "../utilities/utilities";
export const derugProgramFactory = () => {
  return new Program<DerugProgram>(
    IDL,
    new PublicKey(DERUG_PROGRAM_ID),
    new AnchorProvider(RPC_CONNECTION, new NodeWallet(Keypair.generate()), {
      commitment: "confirmed",
    })
  );
};
