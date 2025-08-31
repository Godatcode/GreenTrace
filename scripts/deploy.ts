import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying GreenTrace contracts to Avalanche Fuji Testnet...");

  // Get the contract factory
  const ProductRegistry = await ethers.getContractFactory("ProductRegistry");
  const CarbonCredit = await ethers.getContractFactory("CarbonCredit");

  console.log("📝 Deploying ProductRegistry...");
  const productRegistry = await ProductRegistry.deploy();
  await productRegistry.deployed();

  console.log("🌿 Deploying CarbonCredit...");
  const carbonCredit = await CarbonCredit.deploy();
  await carbonCredit.deployed();

  console.log("✅ Contracts deployed successfully!");
  console.log("📍 ProductRegistry deployed to:", productRegistry.address);
  console.log("📍 CarbonCredit deployed to:", carbonCredit.address);
  console.log("🌐 Network: Avalanche Fuji Testnet (Chain ID: 43113)");

  // Copy the new ABI to frontend
  console.log("📋 Copying contract ABIs to frontend...");
  
  // You can add logic here to copy the new ABI files if needed
  
  console.log("🎉 Deployment complete! Update your frontend with these addresses:");
  console.log("ProductRegistry:", productRegistry.address);
  console.log("CarbonCredit:", carbonCredit.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
