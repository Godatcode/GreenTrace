import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DeployModule = buildModule("Deploy", (m) => {
  // Deploy ProductRegistry contract
  const productRegistry = m.contract("ProductRegistry");
  
  // Deploy CarbonCredit contract
  const carbonCredit = m.contract("CarbonCredit");
  
  return { productRegistry, carbonCredit };
});

export default DeployModule;
