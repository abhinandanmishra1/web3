import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";

const NFTLiquidationPlatform = () => {
  const { connected, publicKey, connect, disconnect } = useWallet();
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);
  const [desiredToken, setDesiredToken] = useState<string | null>(null);
  const [nftOptions, setNftOptions] = useState<string[]>([]);
  const [tokenOptions, setTokenOptions] = useState<string[]>([
    "USDC",
    "USDT",
    "DAI",
  ]); // Add more token options as needed

  useEffect(() => {
    const fetchNFTs = async () => {
      if (publicKey) {
        const connection = new Connection("http://localhost:8899");
        const nfts = await connection.getParsedProgramAccounts(
          new PublicKey("66YQev8hEiofNcWnvAkfHTHS51NpL5jYtKYjLAN5EVHM"),
          {
            filters: [
              {
                dataSize: 682,
              },
              {
                memcmp: {
                  offset: 32,
                  bytes: publicKey.toBase58(),
                },
              },
            ],
          }
        );

        const nftIds = nfts.map((nft) => nft.pubkey.toBase58());
        setNftOptions(nftIds);
      }
    };

    fetchNFTs();
  }, [publicKey]);

  const connectWallet = async () => {
    try {
      await connect();
      console.log("Connected with Public Key:", publicKey?.toString());
    } catch (error) {
      console.error("Connection Error:", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnect();
      console.log("Disconnected");
    } catch (error) {
      console.error("Disconnection Error:", error);
    }
  };

//   const getOptimalNftPrice = async (collectionId: string, nftId: string) => {
//     const url = `https://api.tensor.so/sol/collections/${collectionId}/mints/${nftId}/floor`;
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("Failed to fetch NFT price");
//     }
//     const data = await response.json();
//     return data.price; // Assuming the response contains the price key
//   };

  const convertSolToToken = async (amountSol: number, tokenOut: string) => {
    const url = "https://api.jupiter.exchange/v6/swap";
    const headers = { "Content-Type": "application/json" };
    const payload = {
      amount: amountSol,
      inToken: "SOL",
      outToken: tokenOut,
      slippage: 1.0,
    };

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to convert SOL to token");
    }

    return response.json(); // Assuming the response contains the swap details
  };

  const getOptimalNftPrice = async (nftId: string) => {
    const url = `https://api.tensor.so/sol/mints/${nftId}/floor`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch NFT price');
    }
    const data = await response.json();
    return data.price; // Assuming the response contains the price key
  };

  const handleSwap = async () => {
    if (!selectedNFT || !desiredToken) {
      alert('Please select an NFT and a desired token.');
      return;
    }
  
    try {
      const nftPriceInSol = await getOptimalNftPrice(selectedNFT);
      const swapResponse = await convertSolToToken(nftPriceInSol, desiredToken);
  
      console.log('Swap Response:', swapResponse);
      alert(`Successfully swapped ${nftPriceInSol} SOL for ${desiredToken}`);
    } catch (error) {
      console.error('Error during swap:', error);
      alert('An error occurred during the swap. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!connected ? <WalletMultiButton /> : <WalletDisconnectButton />}
      {connected ? (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">NFT Liquidation Platform</h2>
          <div className="mb-4">
            <label htmlFor="nft" className="block font-medium mb-2">
              Select NFT to swap:
            </label>
            <select
              id="nft"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={selectedNFT || ""}
              onChange={(e) => setSelectedNFT(e.target.value)}
            >
              <option value="">Select an NFT</option>
              {nftOptions.map((nftId) => (
                <option key={nftId} value={nftId}>
                  {nftId}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="token" className="block font-medium mb-2">
              Desired token:
            </label>
            <select
              id="token"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={desiredToken || ""}
              onChange={(e) => setDesiredToken(e.target.value)}
            >
              <option value="">Select a desired token</option>
              {tokenOptions.map((token) => (
                <option key={token} value={token}>
                  {token}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            onClick={handleSwap}
          >
            Swap
          </button>
        </div>
      ) : (
        <p>Please connect your wallet to use the NFT Liquidation Platform.</p>
      )}
    </div>
  );
};

export default NFTLiquidationPlatform;
