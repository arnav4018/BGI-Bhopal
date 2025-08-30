// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./GreenHydrogenCredit.sol";

contract EnhancedGreenHydrogenCredit is GreenHydrogenCredit {
    
    struct CarbonImpact {
        uint256 co2Saved; // in kg
        uint256 renewableEnergyUsed; // in kWh
        string energySource; // "solar", "wind", "hydro", etc.
        bool isGreenCertified;
    }
    
    struct QualityMetrics {
        uint256 purity; // percentage * 100 (e.g., 9997 = 99.97%)
        uint256 temperature; // in Celsius * 10
        uint256 pressure; // in bar * 10
        string productionMethod; // "electrolysis", "steam_reforming", etc.
        uint256 timestamp;
    }
    
    struct MarketListing {
        uint256 creditId;
        uint256 price; // in wei
        address seller;
        uint256 listedAt;
        bool isActive;
    }
    
    // Enhanced mappings
    mapping(uint256 => CarbonImpact) public carbonImpacts;
    mapping(uint256 => QualityMetrics) public qualityMetrics;
    mapping(uint256 => MarketListing) public marketListings;
    mapping(address => uint256[]) public userListings;
    
    // Fraud detection
    mapping(address => uint256) public dailyIssuanceLimit;
    mapping(address => uint256) public lastIssuanceDate;
    mapping(address => uint256) public dailyIssuanceCount;
    
    // Staking and rewards
    mapping(address => uint256) public stakedCredits;
    mapping(address => uint256) public rewardBalance;
    
    // Events
    event CarbonImpactRecorded(uint256 indexed creditId, uint256 co2Saved, string energySource);
    event QualityMetricsRecorded(uint256 indexed creditId, uint256 purity, string productionMethod);
    event CreditListed(uint256 indexed creditId, uint256 price, address indexed seller);
    event CreditSold(uint256 indexed creditId, uint256 price, address indexed buyer, address indexed seller);
    event FraudDetected(address indexed producer, string reason);
    event RewardDistributed(address indexed recipient, uint256 amount);
    
    // Modifiers
    modifier validQualityMetrics(uint256 purity, uint256 temperature, uint256 pressure) {
        require(purity >= 9500 && purity <= 10000, "Purity must be between 95% and 100%");
        require(temperature >= 200 && temperature <= 1000, "Temperature out of valid range");
        require(pressure >= 10 && pressure <= 1000, "Pressure out of valid range");
        _;
    }
    
    modifier antiSpam(address producer) {
        uint256 today = block.timestamp / 86400; // Current day
        if (lastIssuanceDate[producer] != today) {
            dailyIssuanceCount[producer] = 0;
            lastIssuanceDate[producer] = today;
        }
        require(dailyIssuanceCount[producer] < dailyIssuanceLimit[producer], "Daily issuance limit exceeded");
        _;
    }
    
    constructor() GreenHydrogenCredit() {
        // Set default daily limits
        dailyIssuanceLimit[msg.sender] = 100; // Owner can issue 100 credits per day
    }
    
    // Enhanced credit issuance with environmental data
    function issueCreditWithImpact(
        uint256 hydrogenAmount,
        uint256 co2Saved,
        uint256 renewableEnergyUsed,
        string memory energySource,
        uint256 purity,
        uint256 temperature,
        uint256 pressure,
        string memory productionMethod
    ) external antiSpam(msg.sender) validQualityMetrics(purity, temperature, pressure) returns (uint256) {
        
        // Issue the basic credit
        uint256 creditId = issueCredit(hydrogenAmount);
        
        // Record carbon impact
        carbonImpacts[creditId] = CarbonImpact({
            co2Saved: co2Saved,
            renewableEnergyUsed: renewableEnergyUsed,
            energySource: energySource,
            isGreenCertified: true
        });
        
        // Record quality metrics
        qualityMetrics[creditId] = QualityMetrics({
            purity: purity,
            temperature: temperature,
            pressure: pressure,
            productionMethod: productionMethod,
            timestamp: block.timestamp
        });
        
        // Update daily count
        dailyIssuanceCount[msg.sender]++;
        
        // Fraud detection
        if (hydrogenAmount > 1000) { // Unusually high amount
            emit FraudDetected(msg.sender, "Unusually high hydrogen amount");
        }
        
        if (purity > 9999) { // Suspiciously perfect purity
            emit FraudDetected(msg.sender, "Suspiciously high purity level");
        }
        
        emit CarbonImpactRecorded(creditId, co2Saved, energySource);
        emit QualityMetricsRecorded(creditId, purity, productionMethod);
        
        return creditId;
    }
    
    // Marketplace functions
    function listCreditForSale(uint256 creditId, uint256 price) external creditExists(creditId) notRetired(creditId) {
        require(credits[creditId].currentOwner == msg.sender, "You don't own this credit");
        require(price > 0, "Price must be greater than 0");
        require(!marketListings[creditId].isActive, "Credit already listed");
        
        marketListings[creditId] = MarketListing({
            creditId: creditId,
            price: price,
            seller: msg.sender,
            listedAt: block.timestamp,
            isActive: true
        });
        
        userListings[msg.sender].push(creditId);
        
        emit CreditListed(creditId, price, msg.sender);
    }
    
    function purchaseCredit(uint256 creditId) external payable creditExists(creditId) {
        MarketListing storage listing = marketListings[creditId];
        require(listing.isActive, "Credit not for sale");
        require(msg.value >= listing.price, "Insufficient payment");
        require(msg.sender != listing.seller, "Cannot buy your own credit");
        
        // Transfer ownership
        credits[creditId].currentOwner = msg.sender;
        
        // Transfer payment to seller
        payable(listing.seller).transfer(listing.price);
        
        // Return excess payment
        if (msg.value > listing.price) {
            payable(msg.sender).transfer(msg.value - listing.price);
        }
        
        // Record transaction
        creditHistory[creditId].push(Transaction({
            creditId: creditId,
            from: listing.seller,
            to: msg.sender,
            timestamp: block.timestamp,
            transactionType: "PURCHASED"
        }));
        
        // Deactivate listing
        listing.isActive = false;
        
        emit CreditSold(creditId, listing.price, msg.sender, listing.seller);
        emit CreditTransferred(creditId, listing.seller, msg.sender);
    }
    
    // Staking mechanism for long-term holders
    function stakeCredit(uint256 creditId) external creditExists(creditId) notRetired(creditId) {
        require(credits[creditId].currentOwner == msg.sender, "You don't own this credit");
        require(credits[creditId].isVerified, "Credit must be verified to stake");
        
        stakedCredits[msg.sender]++;
        
        // Lock the credit (prevent transfer while staked)
        credits[creditId].currentOwner = address(this);
        
        creditHistory[creditId].push(Transaction({
            creditId: creditId,
            from: msg.sender,
            to: address(this),
            timestamp: block.timestamp,
            transactionType: "STAKED"
        }));
    }
    
    // Reward distribution for stakers
    function distributeRewards() external onlyOwner {
        // Simple reward mechanism - distribute based on staked credits
        // In a real implementation, this would be more sophisticated
        uint256 totalStaked = 0;
        
        // Calculate total staked credits (simplified)
        for (uint256 i = 1; i < nextCreditId; i++) {
            if (credits[i].currentOwner == address(this)) {
                totalStaked++;
            }
        }
        
        if (totalStaked > 0) {
            uint256 rewardPerCredit = address(this).balance / totalStaked;
            
            // Distribute rewards (simplified - in practice, you'd track individual stakes)
            for (uint256 i = 1; i < nextCreditId; i++) {
                if (credits[i].currentOwner == address(this)) {
                    address originalOwner = credits[i].producer; // Simplified
                    rewardBalance[originalOwner] += rewardPerCredit;
                    emit RewardDistributed(originalOwner, rewardPerCredit);
                }
            }
        }
    }
    
    // Withdraw rewards
    function withdrawRewards() external {
        uint256 reward = rewardBalance[msg.sender];
        require(reward > 0, "No rewards to withdraw");
        
        rewardBalance[msg.sender] = 0;
        payable(msg.sender).transfer(reward);
    }
    
    // Set daily issuance limits (anti-fraud measure)
    function setDailyIssuanceLimit(address producer, uint256 limit) external onlyOwner {
        dailyIssuanceLimit[producer] = limit;
    }
    
    // Get enhanced credit information
    function getEnhancedCreditInfo(uint256 creditId) external view creditExists(creditId) returns (
        Credit memory credit,
        CarbonImpact memory impact,
        QualityMetrics memory quality,
        MarketListing memory listing
    ) {
        return (
            credits[creditId],
            carbonImpacts[creditId],
            qualityMetrics[creditId],
            marketListings[creditId]
        );
    }
    
    // Get user's active listings
    function getUserListings(address user) external view returns (uint256[] memory) {
        return userListings[user];
    }
    
    // Calculate environmental impact score
    function calculateEnvironmentalScore(uint256 creditId) external view creditExists(creditId) returns (uint256) {
        CarbonImpact memory impact = carbonImpacts[creditId];
        QualityMetrics memory quality = qualityMetrics[creditId];
        
        uint256 score = 0;
        
        // CO2 savings (max 40 points)
        score += (impact.co2Saved * 40) / 10000; // Assuming max 10,000 kg CO2 saved
        
        // Renewable energy usage (max 30 points)
        score += (impact.renewableEnergyUsed * 30) / 100000; // Assuming max 100,000 kWh
        
        // Purity (max 20 points)
        score += ((quality.purity - 9500) * 20) / 500; // Scale from 95% to 100%
        
        // Green certification bonus (10 points)
        if (impact.isGreenCertified) {
            score += 10;
        }
        
        return score > 100 ? 100 : score; // Cap at 100
    }
    
    // Receive function to accept payments
    receive() external payable {}
}