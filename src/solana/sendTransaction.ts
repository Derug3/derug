import { AnchorWallet, WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { IDerugInstruction } from "../interface/derug.interface";
import { toast } from "react-hot-toast";
export const sendTransaction = async (
  connection: Connection,
  instructions: IDerugInstruction[],
  wallet: WalletContextState
) => {
  try {
    const transactions: VersionedTransaction[] = [];

    for (const instructionSet of instructions) {
      const versionedMessage = new TransactionMessage({
        instructions: instructionSet.instructions,
        payerKey: wallet.publicKey!,
        recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
      }).compileToV0Message();

      const versionedTransaction = new VersionedTransaction(versionedMessage);
      transactions.push(versionedTransaction);
    }

    const sigendTransactions = await wallet.signAllTransactions!(transactions);

    for (const [index, tx] of sigendTransactions.entries()) {
      toast.promise(
        connection.sendRawTransaction(tx.serialize(), {
          preflightCommitment: "confirmed",
        }),
        {
          error: (data) => {
            return "Failed to send transaction";
          },
          loading: instructions[index].pendingDescription,
          success: (data) => {
            console.log(data);

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
