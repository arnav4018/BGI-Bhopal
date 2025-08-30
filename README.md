# BGI Bhopal - Blockchain Projects Repository

This repository contains multiple blockchain-based projects developed for BGI Bhopal, focusing on sustainable energy and environmental solutions.

## Projects

### 🌱 Green Hydrogen Credit System
**Location**: `/green-hydrogen-credit-system/`

A full-stack web application that simulates a transparent and immutable Green Hydrogen Credit System using blockchain technology. Features a modern, animated interface for producers, consumers, and auditors.

**Key Features:**
- Credit issuance, transfer, and retirement system
- Immutable transaction history and audit trails
- Multi-role access (Producers, Consumers, Auditors)
- Modern UI with Next.js 14, TypeScript, and Tailwind CSS
- Smart contract implementation in Solidity
- Local blockchain simulation with Hardhat

**Quick Start:**
```bash
cd green-hydrogen-credit-system
npm install
npm run dev
```

**Technologies:** Next.js 14, TypeScript, Solidity, Hardhat, Tailwind CSS, Framer Motion

---

### 🏭 Green Hydrogen Subsidy System
**Location**: `/contracts/`, `/frontend/`, `/backend/`

A blockchain-based subsidy management system for green hydrogen production with separate frontend and backend components.

**Key Features:**
- Subsidy application and approval workflow
- Smart contract for subsidy distribution
- RESTful API backend
- React-based frontend interface

**Quick Start:**
```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev

# Smart Contracts
cd contracts
npm install
npx hardhat compile
```

**Technologies:** React, Node.js, Express, Solidity, Hardhat

## Repository Structure

```
BGI-Bhopal/
├── green-hydrogen-credit-system/    # Complete Next.js application
│   ├── app/                        # Next.js App Router pages
│   ├── contracts/                  # Smart contracts
│   ├── scripts/                    # Deployment scripts
│   └── test/                       # Contract tests
├── contracts/                      # Legacy smart contracts
├── frontend/                       # React frontend
├── backend/                        # Node.js backend
├── start-hardhat.bat              # Windows batch files
├── start-local-dev.bat
└── README.md                       # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Basic understanding of blockchain concepts

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/arnav4018/BGI-Bhopal.git
   cd BGI-Bhopal
   ```

2. Choose your project and follow the specific README instructions in each project folder.

## Development Workflow

### For Green Hydrogen Credit System:
```bash
cd green-hydrogen-credit-system
npm install
npm run node          # Start local blockchain
npm run compile       # Compile contracts
npm run deploy        # Deploy contracts
npm run dev           # Start development server
```

### For Legacy System:
```bash
# Terminal 1 - Blockchain
cd contracts
npm install
npx hardhat node

# Terminal 2 - Backend
cd backend
npm install
npm start

# Terminal 3 - Frontend
cd frontend
npm install
npm run dev
```

## Features Comparison

| Feature | Green Hydrogen Credit System | Legacy Subsidy System |
|---------|----------------------------|----------------------|
| Framework | Next.js 14 (Full-stack) | React + Node.js |
| UI/UX | Modern, animated | Basic interface |
| Smart Contracts | Advanced credit management | Basic subsidy distribution |
| Data Persistence | localStorage simulation | Traditional backend |
| Testing | Comprehensive test suite | Basic testing |
| Documentation | Extensive | Minimal |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues:
- Open a GitHub issue
- Contact the development team
- Check individual project READMEs for specific guidance

---

**Developed for BGI Bhopal - Advancing Sustainable Energy Solutions through Blockchain Technology**