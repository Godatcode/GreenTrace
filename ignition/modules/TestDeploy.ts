import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TestDeployModule = buildModule("TestDeploy", (m) => {
  // Deploy only ProductRegistry contract for testing
  const productRegistry = m.contract("ProductRegistry");
  
  return { productRegistry };
});

export default TestDeployModule;
