# Local Development Setup

## Terminal 1: Start Hardhat Network
```bash
cd contracts
npx hardhat node
```
This gives you 20 accounts with 10,000 ETH each for testing.

## Terminal 2: Deploy Contract Locally
```bash
cd contracts
npx hardhat run scripts/deploy-local.js --network localhost
```

## Terminal 3: Start Backend
```bash
cd backend
npm start
```

## Terminal 4: Start Frontend
```bash
cd frontend
npm run dev
```

## Update .env for Local Testing
```
ALCHEMY_SEPOLIA_URL="http://127.0.0.1:8545"  # Local Hardhat RPC
CONTRACT_ADDRESS="<address_from_deployment>"
```