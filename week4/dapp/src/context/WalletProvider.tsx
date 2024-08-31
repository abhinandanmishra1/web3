import '@solana/wallet-adapter-react-ui/styles.css';

import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from "@solana/wallet-adapter-react";
import { FC, ReactNode, useMemo } from "react";
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter, UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = clusterApiUrl(network);

  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network }),
    new TorusWalletAdapter(),
  ], [network]);

  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/Hf5NHIaEWfNRpdKI1U55yKFTLELaqnZq"}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
            {children}
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};
