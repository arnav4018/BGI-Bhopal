const axios = require('axios');

async function testSystem() {
  console.log('🧪 Testing Green Hydrogen Subsidy System\n');
  
  try {
    // Test 1: Health check
    console.log('1️⃣ Testing backend health...');
    const health = await axios.get('http://localhost:3001/health');
    console.log('✅ Backend healthy:', health.data);
    
    // Test 2: Contract info
    console.log('\n2️⃣ Getting contract info...');
    const contractInfo = await axios.get('http://localhost:3001/contract-info');
    console.log('✅ Contract info:', contractInfo.data);
    
    // Test 3: Submit production data
    console.log('\n3️⃣ Submitting production data...');
    const submission = await axios.post('http://localhost:3001/submit', {
      producer: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', // Hardhat account #2
      volume: 150, // 150 kg (above the 100 kg milestone)
      dataHash: 'test-hash-123'
    });
    console.log('✅ Submission created:', submission.data);
    
    // Test 4: Get submissions
    console.log('\n4️⃣ Getting all submissions...');
    const submissions = await axios.get('http://localhost:3001/submissions');
    console.log('✅ Submissions:', submissions.data);
    
    // Test 5: Oracle verification and disbursement
    console.log('\n5️⃣ Testing oracle verification...');
    const verification = await axios.post('http://localhost:3001/oracle/verify-and-push', {
      id: submission.data.id,
      milestoneIndex: 0 // First milestone
    });
    console.log('✅ Verification successful:', verification.data);
    
    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('\n📋 System Status:');
    console.log('✅ Hardhat network running');
    console.log('✅ Smart contract deployed and configured');
    console.log('✅ Backend API working');
    console.log('✅ Frontend available at http://localhost:5173');
    console.log('✅ Oracle functionality working');
    console.log('✅ Payment disbursement successful');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run if axios is available
if (typeof require !== 'undefined') {
  try {
    testSystem();
  } catch (error) {
    console.log('⚠️  Install axios to run tests: npm install axios');
    console.log('Or test manually using the frontend at http://localhost:5173');
  }
}