import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export const WalletConnect = () => {
  const { connected } = useWallet();

  return (
    <div>
      <WalletMultiButton />
      {connected && <p>Wallet connected!</p>}
    </div>
  );
};
