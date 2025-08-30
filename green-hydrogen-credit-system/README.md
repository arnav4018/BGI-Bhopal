# Green Hydrogen Credit System

A full-stack web application that simulates a transparent and immutable Green Hydrogen Credit System using blockchain technology. The application features a modern, animated interface for producers, consumers, and auditors to interact with smart contract-based credits.

## Features

### 🌱 Core Functionality
- **Credit Issuance**: Producers can mint new Green Hydrogen Credits with unique IDs and timestamps
- **Credit Management**: View, transfer, and retire credits through an intuitive interface
- **Audit Trail**: Complete transaction history for every credit, ensuring immutability
- **Fraud Prevention**: Built-in mechanisms to prevent double counting and fraudulent transfers

### 🎨 User Interface
- **Modern Design**: Clean, Figma-like aesthetic with green, gray, and white color palette
- **Smooth Animations**: Subtle hover effects, state transitions, and loading animations
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live data updates without page refreshes

### 🔐 Security & Transparency
- **Blockchain Simulation**: Local smart contract deployment and interaction
- **Immutable Ledger**: All transactions are permanently recorded
- **Multi-role Access**: Separate interfaces for producers, consumers, and auditors
- **Verification System**: Auditor approval process for credit validation

## Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, customizable icons

### Smart Contract & Blockchain
- **Solidity**: Smart contract development
- **Hardhat**: Local blockchain development environment
- **Local Storage**: Persistent data simulation

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Navigate to the project directory**
   ```bash
   cd green-hydrogen-credit-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the local blockchain**
   ```bash
   npm run node
   ```
   Keep this terminal running - it's your local blockchain.

4. **Deploy the smart contract** (in a new terminal)
   ```bash
   npm run compile
   npm run deploy
   ```

5. **Start the development server** (in another new terminal)
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Alternative: Frontend Only Setup
If you encounter blockchain setup issues, you can run just the frontend:
```bash
npm install
npm run dev
```
The app will work with localStorage simulation (no blockchain required).

## Usage Guide

### 🏭 Producer Dashboard
1. Navigate to "Producer Dashboard"
2. Enter the amount of hydrogen produced (in tons)
3. Click "Issue Credit" to mint a new credit
4. View your issued credits and their status

### 📊 Credit Ledger
1. Navigate to "Credit Ledger"
2. View all credits in the system
3. Use search and filters to find specific credits
4. Transfer credits to other addresses
5. Retire credits when consumed

### 🛡️ Auditor View
1. Navigate to "Auditor View"
2. Enter a Credit ID to verify
3. Review the complete transaction history
4. Verify credits to mark them as authentic
5. Monitor system integrity and flag suspicious activity

## Smart Contract Features

### Core Functions
- `issueCredit(uint256 hydrogenAmount)`: Issue new credits
- `transferCredit(uint256 creditId, address to)`: Transfer ownership
- `retireCredit(uint256 creditId)`: Retire credits
- `verifyCredit(uint256 creditId)`: Auditor verification
- `getCredit(uint256 creditId)`: Get credit details
- `getCreditHistory(uint256 creditId)`: Get transaction history

### Security Features
- Ownership validation for transfers and retirement
- Prevention of double spending
- Immutable transaction history
- Role-based access control for auditors

## Testing

Run the smart contract tests:
```bash
npm run test
```

## Troubleshooting

### Common Issues

**1. Contract deployment fails with "Cannot connect to network"**
- Make sure the local blockchain is running (`npm run node`)
- The blockchain should show "Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/"
- Try waiting a few seconds after starting the blockchain before deploying

**2. Application works without blockchain**
- The frontend uses localStorage simulation, so it works independently
- Smart contract features are simulated for demonstration purposes
- For full blockchain integration, ensure contract deployment succeeds

**3. Port conflicts**
- If port 3000 is busy, Next.js will suggest an alternative port
- If port 8545 is busy, modify `hardhat.config.js` to use a different port

**4. Dependencies issues**
- Run `npm audit fix` to resolve minor vulnerabilities
- Deprecated package warnings are normal and don't affect functionality

### Quick Start (Frontend Only)
If you want to run just the frontend without blockchain:
```bash
npm install
npm run dev
```
The application will work with localStorage simulation.

## Data Persistence

The application uses localStorage to simulate blockchain persistence:
- Credits and transactions are stored locally
- Data persists between browser sessions
- Simulates a permanent ledger without requiring a live blockchain

## Development Notes

### Local Blockchain
- Uses Hardhat's local network (http://127.0.0.1:8545)
- Provides 20 test accounts with ETH
- Instant transaction confirmation
- Perfect for development and testing

### State Management
- React hooks for local state
- Custom localStorage hook for persistence
- Real-time UI updates on state changes

### Animation System
- Framer Motion for smooth transitions
- Staggered animations for list items
- Loading states and micro-interactions
- Responsive hover effects

## Project Structure

```
green-hydrogen-credit-system/
├── app/                          # Next.js App Router
│   ├── components/              # Reusable UI components
│   │   └── Navbar.tsx          # Navigation component
│   ├── hooks/                   # Custom React hooks
│   │   └── useLocalStorage.ts  # Local storage hook
│   ├── producer/               # Producer dashboard page
│   ├── ledger/                 # Credit ledger page
│   ├── auditor/                # Auditor view page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── contracts/                   # Smart contracts
│   └── GreenHydrogenCredit.sol # Main contract
├── scripts/                     # Deployment scripts
│   └── deploy.js               # Contract deployment
├── test/                        # Contract tests
│   └── GreenHydrogenCredit.test.js
└── Configuration files
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This is a demonstration application for educational purposes. For production use, additional security measures, proper blockchain integration, and comprehensive testing would be required.