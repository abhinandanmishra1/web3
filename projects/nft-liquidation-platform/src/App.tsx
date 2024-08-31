import NFTLiquidationPlatform from './components/NFTLiquidationPlatform';
import { WalletProvider } from './context/WalletProvider';

const App = () => {
  return (
    <WalletProvider>
      {/* Your app content */}

      <NFTLiquidationPlatform />

    </WalletProvider>
  );
};

export default App;
