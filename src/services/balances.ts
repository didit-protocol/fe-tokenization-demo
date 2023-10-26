import { ethers } from "ethers";

async function getBalance() {
  // Check if the browser has injected an Ethereum provider (e.g., MetaMask).
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    try {
      // Request account access if needed
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const balance = await provider.getBalance(accounts[0]);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error;
    }
  } else {
    console.warn(
      "Ethereum provider is not available. Install a web3 browser extension like MetaMask."
    );
    throw new Error("Ethereum provider is not available.");
  }
}

export default getBalance;

// ABI for ERC20 `balanceOf` function
export const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "supply", type: "uint256" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    type: "function",
  },
];

export const ERC20_ABI_PAYABLE = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "supply", type: "uint256" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable", // added as the mint function is payable
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export async function getERC20Balance(
  contractAddress: string
): Promise<string> {
  if (typeof window === "undefined" || typeof window.ethereum === "undefined") {
    console.warn(
      "Ethereum provider is not available. Install a web3 browser extension like MetaMask."
    );
    return "0";
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum as any);

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);
    const balance = await contract.balanceOf(accounts[0]);
    return ethers.utils.formatUnits(balance, 18); // Assuming 18 decimals, adjust if different
  } catch (error) {
    console.error("Error fetching ERC20 balance:", error);
    return "0";
  }
}

export async function getTotalSupply(contractAddress: string): Promise<string> {
  if (typeof window === "undefined" || typeof window.ethereum === "undefined") {
    console.warn(
      "Ethereum provider is not available. Install a web3 browser extension like MetaMask."
    );
    return "0";
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);

  try {
    const totalSupply = await contract.totalSupply();
    return ethers.utils.formatUnits(totalSupply, 18); // Assuming 18 decimals, adjust if different
  } catch (error) {
    console.error("Error fetching total supply:", error);
    return "0";
  }
}

export async function mintTokens(
  contractAddress: string,
  to: string,
  amount: ethers.BigNumber
): Promise<void> {
  if (typeof window === "undefined" || typeof window.ethereum === "undefined") {
    console.warn(
      "Ethereum provider is not available. Install a web3 browser extension like MetaMask."
    );
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, ERC20_ABI, signer);

  try {
    await contract.mint(to, amount);
  } catch (error) {
    console.error("Error minting tokens:", error);
  }
}
