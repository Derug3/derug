import {
  IdentityClient,
  keypairIdentity,
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
  SystemProgram,
  Transaction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import toast from "react-hot-toast";
import {
  getCandyMachine,
  getNonMinted,
  getUserMints,
  saveUserMint,
} from "../../api/public-mint.api";
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
import { PLATFORM_FEE } from "../../common/constants";

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
      remintConfigAccount.publicMintPrice === undefined ||
      remintConfigAccount.publicMintPrice === null
    ) {
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
  request: IRequest,
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

    for (const nonMintedChunk of chunkedNonMinted) {
      metaplex.use(walletAdapterIdentity(wallet));

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
              name: nm.newName,
              uri: nm.newUri,
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

    if (remintConfig.walletLimit) {
      const userMintedCount = await getUserMints(
        wallet.publicKey.toString(),
        remintConfig.candyMachine.toString()
      );

      if (
        userMintedCount &&
        userMintedCount.mintedCount === remintConfig.walletLimit
      ) {
        throw new Error("Failed to mint. Reached wallet limit!");
      }
    }

    const minted = await metaplex.candyMachinesV2().mint({
      candyMachine,
    });

    await saveUserMint(
      wallet.publicKey.toString(),
      remintConfig.candyMachine.toString()
    );

    return minted.nft;
  } catch (error: any) {
    console.log(error);

    const parsedError = JSON.parse(JSON.stringify(error)).cause;
    if (parsedError.logs.find((l: any) => l.includes("NotEnoughToken"))) {
      throw new Error(" Not enough tokens to pay for this minting.");
    }
    throw new Error(parseTransactionError(parsedError));
  }
};

export const parseJsonMetadata = (
  request: IRequest,
  remintConfig: IRemintConfig,
  jsonData: any,
  name: string
) => {
  const data = {
    ...jsonData,
    symbol: remintConfig.newSymbol,
    seller_fee_basis_points: remintConfig.sellerFeeBps,
    name,
    external_url: "",
    creators: request.creators.map((c) => {
      return {
        address: c.address.toString(),
        share: c.share,
      };
    }),
  };
  return data;
};

export const closeCandyMachine = async (
  remintConfig: IRemintConfig,
  wallet: AnchorWallet
) => {
  try {
    const cm = await metaplex
      .candyMachinesV2()
      .findByAddress({ address: remintConfig.candyMachine });
    metaplex.use(walletAdapterIdentity(wallet));
    await metaplex.candyMachinesV2().delete({
      candyMachine: cm,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
