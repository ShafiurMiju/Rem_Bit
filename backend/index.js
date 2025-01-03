const express = require("express");
const ethers = require("ethers");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your private key and deployed contract address
const privateKey = "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"; // Replace with your private key
const contractAddress = "0x610178da211fef7d417bc0e6fed39f05609ad788"; // Replace with your deployed contract address

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(privateKey, provider);

const userRegistryABI = [
    "function register(bytes32 hashedPassword, string firstName, string lastName, string email) public",
    "function login(string email, bytes32 hashedPassword) public view returns (bool)",
    "function getUser(address userAddress) public view returns (string firstName, string lastName, string email)"
];

const userRegistryContract = new ethers.Contract(contractAddress, userRegistryABI, wallet);

// Registration Route
app.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPassword = ethers.keccak256(ethers.toUtf8Bytes(password));
        const tx = await userRegistryContract.register(hashedPassword, firstName, lastName, email);
        await tx.wait();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = ethers.keccak256(ethers.toUtf8Bytes(password));
        const isLoggedIn = await userRegistryContract.login(email, hashedPassword);

        if (isLoggedIn) {
            res.status(200).json({ message: "Login successful!" });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed", error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
