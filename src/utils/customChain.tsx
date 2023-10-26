import { Chain } from "wagmi";

export const apothem = {
  id: 51,
  name: "Apothem",
  network: "apothem",
  nativeCurrency: {
    decimals: 18,
    name: "Apothem",
    symbol: "TXDC",
  },
  rpcUrls: {
    public: { http: ["https://rpc.apothem.network"] },
    default: { http: ["https://rpc.apothem.network"] },
  },
  blockExplorers: {
    etherscan: { name: "SnowTrace", url: "https://explorer.apothem.network/" },
    default: { name: "SnowTrace", url: "https://explorer.apothem.network/" },
  },
  // contracts: {
  //   multicall3: {
  //     address: "0xca11bde05977b3631167028862be2a173976ca11",
  //     blockCreated: 11_907_934,
  //   },
  // },
} as const satisfies Chain;
