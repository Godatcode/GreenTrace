import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    fuji: {
      url: process.env.AVALANCHE_FUJI_URL || "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

// Only add Sepolia if both URL and private key are properly set
if (process.env.SEPOLIA_RPC_URL && 
    process.env.SEPOLIA_PRIVATE_KEY && 
    process.env.SEPOLIA_PRIVATE_KEY !== "your_private_key_here") {
  config.networks!.sepolia = {
    url: process.env.SEPOLIA_RPC_URL,
    chainId: 11155111,
    accounts: [process.env.SEPOLIA_PRIVATE_KEY],
  };
}

export default config;
