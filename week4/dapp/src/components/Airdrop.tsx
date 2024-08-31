import { ChangeEvent, useState } from "react";

import { useGetBalance } from "../utils";
import { useWallet } from "@solana/wallet-adapter-react";

export const Airdrop = () => {
  const [sol, setSol] = useState("0");

  const { airdropSols } = useGetBalance();

  const { publicKey } = useWallet();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSol(e.target.value);
  };

  const onSubmit = () => {
    if(typeof Number(sol) !== "number") return;
    
    airdropSols(Number(sol));
  }
  
  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-bold mb-4">Airdrop Sols</h2>
      <div className="flex flex-col">
        <input
          type="number"
          placeholder="amount"
          value={sol}
          disabled={!publicKey}
          onChange={handleChange}
          className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none"
        />
        <button
          onClick={onSubmit}
          disabled={!publicKey}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
        >
          Airdrop
        </button>
      </div>
    </div>

  );
};
