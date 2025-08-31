import { ethers } from "hardhat";

async function main() {
  // Get the signer
  const [sender] = await ethers.getSigners();
  console.log("Sending transaction using the OP chain type");

  console.log("Sending 1 wei from", sender.address, "to itself");

  console.log("Sending L2 transaction");
  const tx = await sender.sendTransaction({
    to: sender.address,
    value: ethers.utils.parseEther("0.000000000000000001"), // 1 wei
  });

  await tx.wait();
  console.log("Transaction sent successfully");
}

// Run the main function and handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
