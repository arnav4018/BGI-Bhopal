// Simple test without ethers to check basic connectivity
const axios = require('axios');

async function testRPC() {
  console.log('🔍 Testing RPC connections...\n');
  
  try {
    // Test local Hardhat network with raw JSON-RPC call
    console.log('1️⃣ Testing Hardhat local network (http://127.0.0.1:8545)...');
    
    const response = await axios.post('http://127.0.0.1:8545', {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 1
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Local RPC response:', response.data);
    
  } catch (error) {
    console.error('❌ Local RPC error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testRPC();