import { ethers } from "hardhat";

async function main() {
  console.log("🔍 Checking wallet balance on Avalanche Fuji...");
  
  // Get the signer (your wallet)
  const [deployer] = await ethers.getSigners();
  console.log("📍 Wallet address:", deployer.address);
  
  // Get balance
  const balance = await deployer.getBalance();
  const balanceInAVAX = ethers.utils.formatEther(balance);
  
  console.log("💰 Balance:", balanceInAVAX, "AVAX");
  
  if (balance.isZero()) {
    console.log("❌ No AVAX found! Please get testnet AVAX from the faucet:");
    console.log("🌐 https://faucet.avax.network/");
    console.log("📋 Your wallet address:", deployer.address);
  } else {
    console.log("✅ You have enough AVAX to deploy contracts!");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
