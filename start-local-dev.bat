@echo off
echo Starting Green Hydrogen Subsidy Local Development Environment
echo.

echo Step 1: Starting Hardhat Local Network...
start "Hardhat Network" cmd /k "cd contracts && npx hardhat node"

timeout /t 5

echo Step 2: Deploying Contract...
cd contracts
call npx hardhat run scripts/deploy-local.js --network localhost
cd ..

echo.
echo Step 3: Starting Backend...
start "Backend" cmd /k "cd backend && npm start"

timeout /t 3

echo Step 4: Starting Frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ All services started!
echo - Hardhat Network: http://127.0.0.1:8545
echo - Backend API: http://localhost:3001
echo - Frontend: http://localhost:5173
echo.
pause