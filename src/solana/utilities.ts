import { bundlrStorage, Metaplex } from "@metaplex-foundation/js";
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

export const feeWallet = new PublicKey(
  "DRG3YRmurqpWQ1jEjK8DiWMuqPX9yL32LXLbuRdoiQwt"
);

export const metadataUploaderWallet = new PublicKey(
  "KQ1jcFYvnH9DNUzBfVbquRohP9uZ6C7DVJJDyqiGB4P"
);

//TODO mainnet: load this from env file
export const metaplex = new Metaplex(RPC_CONNECTION).use(
  bundlrStorage({
    address: "https://devnet.bundlr.network",
    providerUrl: "https://api.devnet.solana.com",
    timeout: 60000,
  })
);

export const candyMachineProgramId = new PublicKey(
  "cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ"
);

export const heliusMintlistEndpoint = process.env.REACT_APP_HELIUS_MINTLIST!;
