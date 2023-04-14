import {
  IdentityClient,
  RpcClient,
  sol,
  toBigNumber,
  toDateTime,
  token,
  walletAdapterIdentity,
  WalletAdapterIdentityDriver,
} from "@metaplex-foundation/js";
import { AnchorWallet, WalletContextState } from "@solana/wallet-adapter-react";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import toast from "react-hot-toast";
import { getCandyMachine, getNonMinted } from "../../api/public-mint.api";
import {
  ICollectionDerugData,
  IRequest,
} from "../../interface/collections.interface";
import {
  CandyMachineDto,
  IDerugInstruction,
  IRemintConfig,
} from "../../interface/derug.interface";
import { remintConfigSeed } from "../seeds";
import { derugProgramFactory, metaplex } from "../utilities";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { chunk } from "lodash";
import {
  getNftName,
  parseKeyArray,
  parseTransactionError,
} from "../../common/helpers";
import { RPC_CONNECTION } from "../../utilities/utilities";
import { sendTransaction, sendVersionedTx } from "../sendTransaction";

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

    if (!remintConfigAccount.publicMintPrice) {
      toast.error("You did not select public mint!");
      return;
    }

    let privateMintEnd;

    if (!remintConfigAccount.privateMintEnd) {
      privateMintEnd = new Date();
    } else {
      privateMintEnd = dayjs
        .unix(remintConfigAccount.privateMintEnd.toNumber() / 1000)
        .toDate();
    }

    metaplex.use(walletAdapterIdentity(wallet));
    await metaplex.candyMachinesV2().create({
      price: remintConfigAccount.mintCurrency
        ? token(remintConfigAccount.publicMintPrice?.toNumber())
        : sol(
            remintConfigAccount.publicMintPrice?.toNumber() / LAMPORTS_PER_SOL
          ),
      itemsAvailable: toBigNumber(nonMintedNfts.length),
      sellerFeeBasisPoints: remintConfigAccount.sellerFeeBps,
      authority: wallet.publicKey!,
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
    return candyMachine.publicKey;
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
    const nonMinted = nonMintedNfts.filter((nm) => !nm.hasReminted);

    const chunkedNonMinted = chunk(nonMinted, 10);
    const candyMachineData = await getCandyMachine(derug.address.toString());

    const candyMachineAccount = await metaplex.candyMachinesV2().findByAddress({
      address: new PublicKey(candyMachineData.candyMachineKey),
    });

    const transactions: Transaction[] = [];
    metaplex.use(walletAdapterIdentity(wallet));

    let totalSum = 0;

    for (const [chunkIndex, nonMintedChunk] of chunkedNonMinted.entries()) {
      const names: string[] = [];
      for (const [index, nmChunk] of nonMintedChunk.entries()) {
        const metadata = await (await fetch(nmChunk.uri)).json();
        const uploaded = await metaplex.nfts().uploadMetadata({
          ...metadata,
          symbol: remintConfig.newSymbol,
          name: remintConfig.newName,
        });
        names.push(
          remintConfig.newName + getNftName(totalSum + derug.totalReminted + 1)
        );
        console.log(uploaded, "UPLOADED");

        nonMintedChunk[index].uri = uploaded.uri;
      }

      const secondTx = metaplex
        .candyMachinesV2()
        .builders()
        .insertItems({
          candyMachine: {
            ...candyMachineAccount,
            itemsLoaded: toBigNumber(totalSum),
          },
          items: nonMintedChunk.map((nm, index) => {
            return {
              name: names[index],
              uri: nm.uri,
            };
          }),
        })
        .toTransaction(await RPC_CONNECTION.getLatestBlockhash());

      totalSum += nonMintedChunk.length;

      transactions.push(secondTx);
    }

    const idClient = new IdentityClient();
    idClient.setDriver(new WalletAdapterIdentityDriver(wallet));

    const signed = await idClient.signAllTransactions(transactions);

    for (const sig of signed) {
      await toast.promise(sendVersionedTx(RPC_CONNECTION, sig), {
        error: () => {
          return "Failed to insert NFTs in candy machine";
        },
        loading: "Inserting batch of NFTs",
        success: "NFTs succesfully inserted",
      });
    }
  } catch (error: any) {
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
    const parsedError = JSON.parse(JSON.stringify(error)).cause;
    if (parsedError.logs.find((l: any) => l.includes("NotEnoughToken"))) {
      throw new Error(" Not enough tokens to pay for this minting.");
    }
    throw new Error(parseTransactionError(parsedError));
  }
};
