import React from "react";

import { getDefaultWallets, DiditAuthProvider, lightTheme } from "didit-sdk";
import { DiditProvider } from "didit-provider";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { apothem } from "@/utils/customChain";
import { publicProvider } from "wagmi/providers/public";

import "didit-sdk/styles.css";

// Didit Walletconnect Project Id
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "";

const { chains, provider, webSocketProvider } = configureChains(
  //[mainnet, polygon, optimism, arbitrum, goerli],
  [apothem],
  [publicProvider()],
  { pollingInterval: 10_000 }
);

const { connectors } = getDefaultWallets({
  appName: "Liquid",
  projectId,
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const DiditProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main>
      <div>
        <WagmiConfig client={wagmiClient}>
          <DiditProvider clientUrl="/api">
            <DiditAuthProvider
              chains={chains}
              modalSize="compact"
              theme={lightTheme()}
            >
              {children}
            </DiditAuthProvider>
          </DiditProvider>
        </WagmiConfig>
      </div>
    </main>
  );
};

export { DiditProviderComponent };
