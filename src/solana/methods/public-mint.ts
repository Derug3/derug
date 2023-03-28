import {
  sol,
  toBigNumber,
  toDateTime,
  token,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey } from "@solana/web3.js";
import toast from "react-hot-toast";
import { getCandyMachine, getNonMinted } from "../../api/public-mint.api";
import {
  ICollectionDerugData,
  IRequest,
} from "../../interface/collections.interface";
import {
  CandyMachineDto,
  IRemintConfig,
} from "../../interface/derug.interface";
import { remintConfigSeed } from "../seeds";
import { derugProgramFactory, metaplex } from "../utilities";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { chunk } from "lodash";
import { RPC_CONNECTION } from "../../utilities/utilities";
import { getNftName } from "../../common/helpers";

dayjs.extend(utc);

export const initCandyMachine = async (
  collectionDerug: ICollectionDerugData,
  wallet: AnchorWallet
) => {
  try {
    const derugProgram = derugProgramFactory();

    const [remintConfig] = PublicKey.findProgramAddressSync(
      [remintConfigSeed, collectionDerug.address.toBuffer()],
      derugProgram.programId
    );
    const remintConfigAccount = await derugProgram.account.remintConfig.fetch(
      remintConfig
    );

    const candyMachineData: CandyMachineDto = await getCandyMachine(
      collectionDerug.address.toString()
    );

    if (!candyMachineData) {
      toast.error("Invalid Candy Machine");
      return;
    }

    const candyMachine = Keypair.fromSecretKey(
      JSON.parse(candyMachineData.candyMachineSecretKey)
    );

    if (
      !remintConfigAccount.mintPrice ||
      !remintConfigAccount.privateMintDuration
    ) {
      toast.error("You did not select public mint!");
      return;
    }

    const privateMintEnd = dayjs()
      .add(remintConfigAccount.privateMintDuration?.toNumber(), "seconds")
      .toDate();

    metaplex.use(walletAdapterIdentity(wallet));
    await metaplex.candyMachinesV2().create({
      price: remintConfigAccount.mintCurrency
        ? token(remintConfigAccount.mintPrice?.toNumber())
        : sol(remintConfigAccount.mintPrice?.toNumber()),
      itemsAvailable: toBigNumber(collectionDerug.totalSupply),
      sellerFeeBasisPoints: remintConfigAccount.sellerFeeBps,
      authority: remintConfigAccount.authority,
      collection: remintConfigAccount.collection,
      candyMachine,
      tokenMint: remintConfigAccount.mintCurrency,
      goLiveDate: toDateTime(privateMintEnd),
      retainAuthority: true,
      isMutable: true,
      creators: remintConfigAccount.creators.map((c) => {
        return {
          address: c.address,
          share: c.share,
          verified: true,
        };
      }),
      symbol: remintConfigAccount.newSymbol,
      wallet: remintConfigAccount.mintFeeTreasury ?? undefined,
    });
  } catch (error: any) {
    toast.error("Failed to init Candy Machine:", error.message);
  }
};

export const storeCandyMachineItems = async (
  remintConfig: IRemintConfig,
  wallet: AnchorWallet,
  derug: ICollectionDerugData
) => {
  try {
    if (derug.winningRequest !== remintConfig.derugRequest) {
      throw new Error("Derug request missmatch");
    }

    const nonMinted = (await getNonMinted(derug.address.toString())).filter(
      (nm) => !nm.hasReminted
    );

    if (nonMinted.length > 500) {
      toast.loading(
        "You will have to sign multiple transactions as there are more than 500 NFTs"
      );
    }

    const candyMachineData = await getCandyMachine(derug.address.toString());

    const candyMachineAccount = await metaplex.candyMachinesV2().findByAddress({
      address: new PublicKey(candyMachineData.candyMachineKey),
    });
    metaplex.use(walletAdapterIdentity(wallet));

    await metaplex.candyMachinesV2().update({
      candyMachine: candyMachineAccount,
      itemsAvailable: toBigNumber(nonMinted.length),
    });

    const chunkedNonMinted = chunk(nonMinted, 500);

    for (const nonMintedChunk of chunkedNonMinted) {
      await metaplex.candyMachinesV2().insertItems({
        candyMachine: candyMachineAccount,
        items: nonMintedChunk.map((nm, index) => {
          return {
            uri: nm.uri,
            name: `${remintConfig.newName} ${getNftName(
              derug.totalReminted + index + 1
            )}`,
          };
        }),
      });
    }
  } catch (error: any) {
    toast.error("Failed to init Candy Machine:", error.message);
  }
};

export const mintNftFromCandyMachine = async (
  remintConfig: IRemintConfig,
  wallet: AnchorWallet
) => {
  metaplex.use(walletAdapterIdentity(wallet));

  try {
    const candyMachine = await metaplex.candyMachinesV2().findByAddress({
      address: remintConfig.candyMachine,
    });

    await metaplex.candyMachinesV2().mint({
      candyMachine,
    });
  } catch (error: any) {
    toast.error("Failed to mint:", error.message);
  }
};
