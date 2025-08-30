const hre = require("hardhat");

async function main() {
  const GreenHydrogenCredit = await hre.ethers.getContractFactory("GreenHydrogenCredit");
  const contract = await GreenHydrogenCredit.deploy();

  await contract.waitForDeployment();

  console.log("GreenHydrogenCredit deployed to:", await contract.getAddress());
  
  // Save contract address and ABI for frontend
  const fs = require('fs');
  const contractAddress = await contract.getAddress();
  
  const deploymentInfo = {
    address: contractAddress,
    abi: contract.interface.format('json')
  };
  
  fs.writeFileSync('./contract-info.json', JSON.stringify(deploymentInfo, null, 2));
  console.log("Contract info saved to contract-info.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});