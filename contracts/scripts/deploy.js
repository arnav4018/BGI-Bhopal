const hre = require("hardhat");

async function main() {
  const GreenHydrogenSubsidy = await hre.ethers.getContractFactory("GreenHydrogenSubsidy");
  const contract = await GreenHydrogenSubsidy.deploy();

  await contract.waitForDeployment();

  console.log("GreenHydrogenSubsidy deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});