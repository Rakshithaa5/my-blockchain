
const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
    // Connect to Ganache
    const provider = new ethers.providers.JsonRpcProvider(
        "http://127.0.0.1:7545"
    );

    // Use the first Ganache test account
    const privateKey = process.env.GANACHE_PRIVATE_KEY;

    if (!privateKey) {
        throw new Error("GANACHE_PRIVATE_KEY is not set");
    }

    const wallet = new ethers.Wallet(privateKey, provider);

    // Read compiled contract files
    const abi = fs.readFileSync(
        "./PeopleProfile_sol_PeopleProfile.abi",
        "utf8"
    );

    const bytecode = fs.readFileSync(
        "./PeopleProfile_sol_PeopleProfile.bin",
        "utf8"
    );

    // Create contract factory
    const factory = new ethers.ContractFactory(
        JSON.parse(abi),
        "0x" + bytecode.trim(),
        wallet
    );

    console.log("Deploying contract...");

    // Deploy contract
    const contract = await factory.deploy();

    await contract.deployed();

    console.log("Contract deployed successfully!");
    console.log("Contract address:", contract.address);
}

main().catch(console.error);
