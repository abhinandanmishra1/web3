import "./App.css";

import { Airdrop, ConnectWallet, SendSolana, SignMessage } from "./components";

function App() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col gap-4 shadow-md p-4 w-[80%] h-[80%]">
        <ConnectWallet />
        <div className="flex gap-4">
        <Airdrop />
        <SendSolana />
        </div>
      </div>
    </div>
  );
}

export default App;
