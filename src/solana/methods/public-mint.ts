import {
  sol,
  toBigNumber,
  toDateTime,
  token,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { AnchorWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
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
import { parseKeyArray } from "../../common/helpers";

dayjs.extend(utc);

export const initCandyMachine = async (
  collectionDerug: ICollectionDerugData,
  wallet: WalletContextState
) => {
  try {
    const derugProgram = derugProgramFactory();

    const nonMintedNfts = await getNonMinted(
      collectionDerug.address.toString()
    );

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
      parseKeyArray(candyMachineData.candyMachineSecretKey)
    );

    if (
      !remintConfigAccount.publicMintPrice ||
      !remintConfigAccount.privateMintEnd
    ) {
      toast.error("You did not select public mint!");
      return;
    }

    const privateMintEnd = dayjs
      .unix(remintConfigAccount.privateMintEnd.toNumber() / 1000)
      .toDate();

    metaplex.use(walletAdapterIdentity(wallet));
    await metaplex.candyMachinesV2().create({
      price: remintConfigAccount.mintCurrency
        ? token(remintConfigAccount.publicMintPrice?.toNumber())
        : sol(
            remintConfigAccount.publicMintPrice?.toNumber() / LAMPORTS_PER_SOL
          ),
      itemsAvailable: toBigNumber(nonMintedNfts.length),
      sellerFeeBasisPoints: remintConfigAccount.sellerFeeBps,
      authority: remintConfigAccount.authority,
      // collection: remintConfigAccount.collection,
      candyMachine,
      tokenMint: remintConfigAccount.mintCurrency,
      maxEditionSupply: toBigNumber(0),
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
    console.log(error);

    throw error;
  }
};

export const storeCandyMachineItems = async (
  remintConfig: IRemintConfig,
  wallet: WalletContextState,
  derug: ICollectionDerugData
) => {
  try {
    if (
      derug.winningRequest?.toString() !== remintConfig.derugRequest.toString()
    ) {
      throw new Error("Derug request missmatch");
    }

    const nonMintedNfts = await getNonMinted(derug.address.toString());
    const nonMinted = nonMintedNfts
      .filter((nm) => !nm.hasReminted)
      .slice(0, derug.totalSupply);
    if (nonMinted.length > 10) {
      toast.success(
        "You will have to sign multiple transactions as there are more than 50 NFTs"
      );
    }

    metaplex.use(walletAdapterIdentity(wallet));

    const chunkedNonMinted = chunk(nonMinted, 10);
    const candyMachineData = await getCandyMachine(derug.address.toString());

    const candyMachineAccount = await metaplex.candyMachinesV2().findByAddress({
      address: new PublicKey(candyMachineData.candyMachineKey),
    });
    for (const nonMintedChunk of chunkedNonMinted) {
      const fileted = nonMintedChunk.filter((nm) => nm.uri !== "");

      const cm = await metaplex
        .candyMachinesV2()
        .refresh(new PublicKey(candyMachineData.candyMachineKey));

      await metaplex.candyMachinesV2().insertItems({
        candyMachine: cm,
        items: fileted.map((nm) => {
          return {
            uri: nm.uri,
            name: remintConfig.newName,
          };
        }),
      });
    }
  } catch (error: any) {
    console.log(error);

    throw error;
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

    const minted = await metaplex.candyMachinesV2().mint({
      candyMachine,
    });

    return minted.nft;
  } catch (error: any) {
    throw error;
  }
};

export const upCm = async (
  cmKey: PublicKey,
  wallet: AnchorWallet,
  request: IRequest
) => {
  const cm = await metaplex.candyMachinesV2().findByAddress({
    address: cmKey,
  });

  metaplex.use(walletAdapterIdentity(wallet));
  await metaplex.candyMachinesV2().update({
    candyMachine: cm,
    creators: request.creators.map((c) => {
      return {
        address: c.address,
        share: c.share,
        verified: true,
      };
    }),
  });
};
