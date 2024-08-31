import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import { BsCopy } from "react-icons/bs";
import { useGetBalance } from "../utils";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export const ConnectWallet = () => {
  const { connected, publicKey } = useWallet();
  const [copied, setCopied] = useState(false);

  const { balance } = useGetBalance();

  const publicKeyBase58 = publicKey?.toBase58() || "";

  const startHalf = publicKeyBase58?.substring(0, 4);
  const endHalf = publicKeyBase58?.substring(publicKeyBase58?.length - 4);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 items-center justify-center">
        {!connected ? (
          <WalletMultiButton />
        ) : (
          <div className="flex gap-2 items-center">
            <WalletDisconnectButton />
            <div className="p-1 px-2 bg-green-300 rounded-lg">
              <p className="flex gap-2">
                Balance : <span>{balance} sols</span>
              </p>
            </div>
          </div>
        )}
        {publicKey && (
          <div className="flex gap-2 items-center px-2 py-1 bg-[#181818] rounded text-gray-300">
            <p className="flex">
              {startHalf}...{endHalf}
            </p>
            {copied ? (
              <p className="text-sm">Copied</p>
            ) : (
              <BsCopy
                className="cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(publicKeyBase58);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 1000);
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
