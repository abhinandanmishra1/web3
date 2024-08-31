import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { useState } from "react";

export const SendSolana = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");


  const onSendSolana = async () => {
    if (!publicKey || !receiver || amount <=0) {
        alert("Something is wrong")
      return;
    }

    try {
        const transaction = new Transaction();
        const instruction = SystemProgram.transfer({
          fromPubkey: new PublicKey(publicKey),
          toPubkey: new PublicKey(receiver),
          lamports: amount * LAMPORTS_PER_SOL,
        });

        console.log(amount)
    
        transaction.add(instruction);
    
        await sendTransaction(transaction, connection);
        alert(`${amount} sols sent to ${receiver}`)
    }catch(err: any) {
        console.log(err);
        alert(err.message)
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-bold mb-4">Send Solana</h2>
      <div className="flex flex-col gap-2">
        <input
          type="number"
          placeholder="amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none"
        />
        <input
          type="text"
          placeholder="receiver"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none"
        />
        <button
          onClick={onSendSolana}
          disabled={!publicKey || !receiver || amount <= 0}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
        >
          Send Solana
        </button>
      </div>
    </div>

  );
};
