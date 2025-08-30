// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GreenHydrogenCredit {
    struct Credit {
        uint256 id;
        address producer;
        uint256 hydrogenAmount; // in tons
        uint256 timestamp;
        address currentOwner;
        bool isRetired;
        bool isVerified;
    }

    struct Transaction {
        uint256 creditId;
        address from;
        address to;
        uint256 timestamp;
        string transactionType; // "ISSUED", "TRANSFERRED", "RETIRED", "VERIFIED"
    }

    mapping(uint256 => Credit) public credits;
    mapping(uint256 => Transaction[]) public creditHistory;
    mapping(address => bool) public auditors;
    
    uint256 public nextCreditId = 1;
    uint256 public totalCreditsIssued;
    uint256 public totalCreditsRetired;
    
    address public owner;
    
    event CreditIssued(uint256 indexed creditId, address indexed producer, uint256 hydrogenAmount);
    event CreditTransferred(uint256 indexed creditId, address indexed from, address indexed to);
    event CreditRetired(uint256 indexed creditId, address indexed owner);
    event CreditVerified(uint256 indexed creditId, address indexed auditor);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    
    modifier onlyAuditor() {
        require(auditors[msg.sender] || msg.sender == owner, "Only auditors can perform this action");
        _;
    }
    
    modifier creditExists(uint256 creditId) {
        require(credits[creditId].id != 0, "Credit does not exist");
        _;
    }
    
    modifier notRetired(uint256 creditId) {
        require(!credits[creditId].isRetired, "Credit is already retired");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        auditors[msg.sender] = true; // Owner is also an auditor
    }
    
    function addAuditor(address auditor) external onlyOwner {
        auditors[auditor] = true;
    }
    
    function removeAuditor(address auditor) external onlyOwner {
        auditors[auditor] = false;
    }
    
    function issueCredit(uint256 hydrogenAmount) external returns (uint256) {
        require(hydrogenAmount > 0, "Hydrogen amount must be greater than 0");
        
        uint256 creditId = nextCreditId++;
        
        credits[creditId] = Credit({
            id: creditId,
            producer: msg.sender,
            hydrogenAmount: hydrogenAmount,
            timestamp: block.timestamp,
            currentOwner: msg.sender,
            isRetired: false,
            isVerified: false
        });
        
        creditHistory[creditId].push(Transaction({
            creditId: creditId,
            from: address(0),
            to: msg.sender,
            timestamp: block.timestamp,
            transactionType: "ISSUED"
        }));
        
        totalCreditsIssued++;
        
        emit CreditIssued(creditId, msg.sender, hydrogenAmount);
        return creditId;
    }
    
    function transferCredit(uint256 creditId, address to) external creditExists(creditId) notRetired(creditId) {
        require(credits[creditId].currentOwner == msg.sender, "You don't own this credit");
        require(to != address(0), "Cannot transfer to zero address");
        require(to != msg.sender, "Cannot transfer to yourself");
        
        credits[creditId].currentOwner = to;
        
        creditHistory[creditId].push(Transaction({
            creditId: creditId,
            from: msg.sender,
            to: to,
            timestamp: block.timestamp,
            transactionType: "TRANSFERRED"
        }));
        
        emit CreditTransferred(creditId, msg.sender, to);
    }
    
    function retireCredit(uint256 creditId) external creditExists(creditId) notRetired(creditId) {
        require(credits[creditId].currentOwner == msg.sender, "You don't own this credit");
        
        credits[creditId].isRetired = true;
        
        creditHistory[creditId].push(Transaction({
            creditId: creditId,
            from: msg.sender,
            to: address(0),
            timestamp: block.timestamp,
            transactionType: "RETIRED"
        }));
        
        totalCreditsRetired++;
        
        emit CreditRetired(creditId, msg.sender);
    }
    
    function verifyCredit(uint256 creditId) external onlyAuditor creditExists(creditId) {
        credits[creditId].isVerified = true;
        
        creditHistory[creditId].push(Transaction({
            creditId: creditId,
            from: address(0),
            to: address(0),
            timestamp: block.timestamp,
            transactionType: "VERIFIED"
        }));
        
        emit CreditVerified(creditId, msg.sender);
    }
    
    function getCredit(uint256 creditId) external view creditExists(creditId) returns (Credit memory) {
        return credits[creditId];
    }
    
    function getCreditHistory(uint256 creditId) external view creditExists(creditId) returns (Transaction[] memory) {
        return creditHistory[creditId];
    }
    
    function getAllCredits() external view returns (Credit[] memory) {
        Credit[] memory allCredits = new Credit[](nextCreditId - 1);
        for (uint256 i = 1; i < nextCreditId; i++) {
            allCredits[i - 1] = credits[i];
        }
        return allCredits;
    }
    
    function getStats() external view returns (uint256, uint256, uint256) {
        return (totalCreditsIssued, totalCreditsRetired, nextCreditId - 1);
    }
}