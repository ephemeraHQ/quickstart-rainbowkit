import "@rainbow-me/rainbowkit/styles.css";
import "./polyfills";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from "wagmi/chains";

import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const projectId =
  process.env.REACT_APP_WALLETCONNECT || "026ac8812e46e03ede0fa590783d1242";

const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: projectId,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.REACT_APP_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
});

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
