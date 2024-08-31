import type { FC } from "react";
import bs58 from "bs58";
import { ed25519 } from "@noble/curves/ed25519";
import { useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export const SignMessage: FC = () => {
  const { publicKey, signMessage } = useWallet();
  const onSignMessage = useCallback(async () => {
    try {
      if (!publicKey) throw new Error("Wallet not connected!");
      if (!signMessage)
        throw new Error("Wallet does not support message signing!");

      const message = new TextEncoder().encode(
        `${
          window.location.host
        } wants you to sign in with your Solana account:\n${publicKey.toBase58()}\n\nPlease sign in.`
      );
      const signature = await signMessage(message);

      if (!ed25519.verify(signature, message, publicKey.toBytes()))
        throw new Error("Message signature invalid!");
      alert("success" + `Message signature: ${bs58.encode(signature)}`);
    } catch (error: any) {
      alert("error" + `Sign Message failed: ${error?.message}`);
    }
  }, [publicKey, signMessage]);

  return (
    <div>
      <button
        className="btn btn-primary bg-blue-500 hover:bg-blue-700 px-2 py-1"
        onClick={onSignMessage}
        disabled={!publicKey || !signMessage}
      >
        Sign Message
      </button>
    </div>
  );
};
