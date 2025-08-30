const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Contract ABI and address (update after deployment)
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = [
  "function registerProducer(string memory _name, string memory _location) public",
  "function submitClaim(uint256 _amount, uint256 _hydrogenProduced) public",
  "function getProducer(address _producer) public view returns (tuple(string name, string location, bool isVerified, uint256 totalSubsidyReceived))",
  "function getClaim(uint256 _claimId) public view returns (tuple(address producer, uint256 amount, uint256 hydrogenProduced, bool approved, uint256 timestamp))",
  "event ProducerRegistered(address indexed producer, string name)",
  "event ClaimSubmitted(uint256 indexed claimId, address indexed producer, uint256 amount)"
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Green Hydrogen Subsidy API is running' });
});

app.get('/api/producer/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const provider = new ethers.JsonRpcProvider('http://localhost:8545');
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    
    const producer = await contract.getProducer(address);
    res.json({
      name: producer.name,
      location: producer.location,
      isVerified: producer.isVerified,
      totalSubsidyReceived: producer.totalSubsidyReceived.toString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/claim/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const provider = new ethers.JsonRpcProvider('http://localhost:8545');
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    
    const claim = await contract.getClaim(id);
    res.json({
      producer: claim.producer,
      amount: claim.amount.toString(),
      hydrogenProduced: claim.hydrogenProduced.toString(),
      approved: claim.approved,
      timestamp: claim.timestamp.toString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});