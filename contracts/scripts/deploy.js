const hre = require("hardhat");

async function main() {
    const UserRegistry = await hre.ethers.getContractFactory("UserRegistry");
    const userRegistry = await UserRegistry.deploy();
    await userRegistry.deployed();
    console.log("UserRegistry deployed to:", userRegistry.address);
}

main().catch((error) => {
    console.error("Error in deployment:", error);
    process.exitCode = 1;
});