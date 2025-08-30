import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = [
  "function registerProducer(string memory _name, string memory _location) public",
  "function submitClaim(uint256 _amount, uint256 _hydrogenProduced) public",
  "function getProducer(address _producer) public view returns (tuple(string name, string location, bool isVerified, uint256 totalSubsidyReceived))"
];

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [producer, setProducer] = useState(null);
  const [formData, setFormData] = useState({ name: '', location: '' });

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        setContract(contractInstance);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    }
  };

  const registerProducer = async () => {
    if (contract && formData.name && formData.location) {
      try {
        const tx = await contract.registerProducer(formData.name, formData.location);
        await tx.wait();
        alert('Producer registered successfully!');
      } catch (error) {
        console.error('Error registering producer:', error);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Green Hydrogen Subsidy DApp</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Wallet Connection</h3>
        {account ? (
          <p>Connected: {account}</p>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Register as Producer</h3>
        <input
          type="text"
          placeholder="Producer Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          style={{ margin: '5px', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          style={{ margin: '5px', padding: '8px' }}
        />
        <button onClick={registerProducer} style={{ margin: '5px', padding: '8px' }}>
          Register Producer
        </button>
      </div>

      <div>
        <h3>About</h3>
        <p>This DApp manages green hydrogen production subsidies on the blockchain.</p>
        <p>Features:</p>
        <ul>
          <li>Producer registration</li>
          <li>Subsidy claim submission</li>
          <li>Transparent verification process</li>
        </ul>
      </div>
    </div>
  );
}

export default App;