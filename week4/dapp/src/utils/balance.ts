import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect } from "react";
import { useStore } from "../context";

// interface ResponseType{
//     jsonrpc: string;
//     result: {
//         context: {
//             apiVersion: string;
//             slot: number;
//         };
//         value: number;
//     };
//     id: string;
// }
export const useGetBalance = () => {
  const { connection } = useConnection();

  const { publicKey } = useWallet();
  const { balance, setBalance} = useStore();

  const fetchBalance = async () => {
    if (!publicKey) {
      return;
    }
    const balance = await connection.getBalance(publicKey, "confirmed");

    setBalance(balance/LAMPORTS_PER_SOL);
  };

  const airdropSols = async (sol: number) => {
    if (!publicKey) {
      return;
    }
    try {
      await connection.requestAirdrop(
        publicKey,
        Number(sol) * LAMPORTS_PER_SOL
      );

      fetchBalance(); 
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [connection, publicKey]);

  return {
    balance,
    fetchBalance,
    airdropSols
  }
};
