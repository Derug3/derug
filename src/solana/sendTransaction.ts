import { AnchorWallet, WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  Keypair,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { IDerugInstruction } from "../interface/derug.interface";
import { toast } from "react-hot-toast";
import nftStore from "../stores/nftStore";
import { RemintingStatus } from "../enums/collections.enums";
export const sendTransaction = async (
  connection: Connection,
  instructions: IDerugInstruction[],
  wallet: WalletContextState
) => {
  try {
    const transactions: VersionedTransaction[] = [];

    const { nfts, setNfts } = nftStore.getState();

    for (const instructionSet of instructions) {
      const versionedMessage = new TransactionMessage({
        instructions: instructionSet.instructions,
        payerKey: wallet.publicKey!,
        recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
      }).compileToV0Message();

      const versionedTransaction = new VersionedTransaction(versionedMessage);
      if (instructionSet.partialSigner) {
        versionedTransaction.sign(instructionSet.partialSigner);
      }
      transactions.push(versionedTransaction);
    }

    const sigendTransactions = await wallet.signAllTransactions!(transactions);

    for (const [index, tx] of sigendTransactions.entries()) {
      const txSim = await connection.simulateTransaction(tx);
      // console.log(txSim.value.logs);

      const savedNfts = [...nfts];

      toast.promise(
        connection.sendRawTransaction(tx.serialize(), {
          preflightCommitment: "confirmed",
        }),
        {
          error: (data) => {
            console.log(data);

            if (instructions[index].remintingNft) {
              savedNfts.push({
                mint: instructions[index].remintingNft?.mint!,
                status: RemintingStatus.Failed,
              });
              setNfts(savedNfts);
            }

            return "Failed to send transaction";
          },
          loading: instructions[index].pendingDescription,
          success: (data) => {
            if (instructions[index].remintingNft) {
              savedNfts.push({
                mint: instructions[index].remintingNft?.mint!,
                status: RemintingStatus.Succeded,
              });
              setNfts(savedNfts);
            }

            return instructions[index].successDescription;
          },
        }
      );
    }
  } catch (error: any) {
    toast.error("Failed to send transaction:", error.message);
    console.log(error);
  }
};
