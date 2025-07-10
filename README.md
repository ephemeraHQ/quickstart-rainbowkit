![Status](https://img.shields.io/badge/Deprecated-brown)

> [!CAUTION]
> This repository is no longer maintained.

The documentation below is provided for historical reference only.

# XMTP PWA with RainbowKit

## Installation

```bash
yarn install
yarn dev
```

## Concepts

Head to our docs to understand XMTP's concepts

- [Get started](https://xmtp.org/docs/build/get-started/overview?sdk=react)
- [Authentication](https://xmtp.org/docs/build/authentication?sdk=react)
- [Conversations](https://xmtp.org/docs/build/conversations?sdk=react)
- [Messages](https://xmtp.org/docs/build/messages/?sdk=react)
- [Streams](https://xmtp.org/docs/build/streams/?sdk=react)

#### Troubleshooting

If you get into issues with `Buffer` and `polyfills` check out the fix below:

- [Check out Buffer issue](https://github.com/xmtp/xmtp-js/issues/487)

## Wallet connect & Wagmi

This tutorial will guide you through the process of creating an XMTP app with WalletConnect & Wagmi.

https://github.com/fabriguespe/xmtp-quickstart-pwa-walletconnect/blob/main/public/video.mp4

### Step 1: Setup

First, you need to import the necessary libraries and components. In your index.js file, import the `WagmiConfig` from `wagmi` and wrap your main component with it.

```jsx
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";

// 1. Get projectId
const projectId = "projectId";

// 2. Create wagmiConfig
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });
```

```jsx
<WagmiConfig config={wagmiConfig}>
  <InboxPage />
</WagmiConfig>
```

### Step 2: User Authentication

In your main component, use the `useAccount` hook to get the user's authentication status and other details.

```jsx
const { address, isConnecting, isDisconnected } = useAccount();
```

### Step 3: Wallet Integration

Use the `useWalletClient` hook to get the user's wallets. Then, find the embedded wallet and set it as the signer.

```jsx
//This is the signer to send to the xmtp client
const { data: walletClient } = useWalletClient();
await initialize({ keys, options, signer /*: walletClient*/ });
```

That's it! You've now created an XMTP app with WalletConnect & Wagmi.
