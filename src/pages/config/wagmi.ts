import { getDefaultWallets } from "diditsdktest";
import { configureChains, createConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Liquid",
  projectId: process.env.NEXT_PUBLIC_DIDIT_APP_PROJECT_ID || "",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const config = {
  chains,
  wagmiConfig,
};

export default config;
