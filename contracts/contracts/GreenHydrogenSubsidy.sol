// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GreenHydrogenSubsidy {
    address public owner;
    
    struct Producer {
        string name;
        string location;
        bool isVerified;
        uint256 totalSubsidyReceived;
    }
    
    struct SubsidyClaim {
        address producer;
        uint256 amount;
        uint256 hydrogenProduced;
        bool approved;
        uint256 timestamp;
    }
    
    mapping(address => Producer) public producers;
    mapping(uint256 => SubsidyClaim) public claims;
    uint256 public claimCounter;
    
    event ProducerRegistered(address indexed producer, string name);
    event ClaimSubmitted(uint256 indexed claimId, address indexed producer, uint256 amount);
    event ClaimApproved(uint256 indexed claimId, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function registerProducer(string memory _name, string memory _location) public {
        producers[msg.sender] = Producer(_name, _location, false, 0);
        emit ProducerRegistered(msg.sender, _name);
    }
    
    function verifyProducer(address _producer) public onlyOwner {
        producers[_producer].isVerified = true;
    }
    
    function submitClaim(uint256 _amount, uint256 _hydrogenProduced) public {
        require(producers[msg.sender].isVerified, "Producer not verified");
        
        claims[claimCounter] = SubsidyClaim(
            msg.sender,
            _amount,
            _hydrogenProduced,
            false,
            block.timestamp
        );
        
        emit ClaimSubmitted(claimCounter, msg.sender, _amount);
        claimCounter++;
    }
    
    function approveClaim(uint256 _claimId) public onlyOwner {
        require(_claimId < claimCounter, "Invalid claim ID");
        require(!claims[_claimId].approved, "Claim already approved");
        
        claims[_claimId].approved = true;
        producers[claims[_claimId].producer].totalSubsidyReceived += claims[_claimId].amount;
        
        emit ClaimApproved(_claimId, claims[_claimId].amount);
    }
    
    function getProducer(address _producer) public view returns (Producer memory) {
        return producers[_producer];
    }
    
    function getClaim(uint256 _claimId) public view returns (SubsidyClaim memory) {
        return claims[_claimId];
    }
}