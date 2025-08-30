const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GreenHydrogenCredit", function () {
  let contract;
  let owner;
  let producer;
  let consumer;
  let auditor;

  beforeEach(async function () {
    [owner, producer, consumer, auditor] = await ethers.getSigners();
    
    const GreenHydrogenCredit = await ethers.getContractFactory("GreenHydrogenCredit");
    contract = await GreenHydrogenCredit.deploy();
    await contract.waitForDeployment();
  });

  describe("Credit Issuance", function () {
    it("Should issue a new credit", async function () {
      const hydrogenAmount = 100;
      
      await expect(contract.connect(producer).issueCredit(hydrogenAmount))
        .to.emit(contract, "CreditIssued")
        .withArgs(1, producer.address, hydrogenAmount);
      
      const credit = await contract.getCredit(1);
      expect(credit.producer).to.equal(producer.address);
      expect(credit.hydrogenAmount).to.equal(hydrogenAmount);
      expect(credit.currentOwner).to.equal(producer.address);
      expect(credit.isRetired).to.be.false;
    });

    it("Should not allow zero hydrogen amount", async function () {
      await expect(contract.connect(producer).issueCredit(0))
        .to.be.revertedWith("Hydrogen amount must be greater than 0");
    });
  });

  describe("Credit Transfer", function () {
    beforeEach(async function () {
      await contract.connect(producer).issueCredit(100);
    });

    it("Should transfer credit to another address", async function () {
      await expect(contract.connect(producer).transferCredit(1, consumer.address))
        .to.emit(contract, "CreditTransferred")
        .withArgs(1, producer.address, consumer.address);
      
      const credit = await contract.getCredit(1);
      expect(credit.currentOwner).to.equal(consumer.address);
    });

    it("Should not allow non-owner to transfer", async function () {
      await expect(contract.connect(consumer).transferCredit(1, consumer.address))
        .to.be.revertedWith("You don't own this credit");
    });
  });

  describe("Credit Retirement", function () {
    beforeEach(async function () {
      await contract.connect(producer).issueCredit(100);
    });

    it("Should retire a credit", async function () {
      await expect(contract.connect(producer).retireCredit(1))
        .to.emit(contract, "CreditRetired")
        .withArgs(1, producer.address);
      
      const credit = await contract.getCredit(1);
      expect(credit.isRetired).to.be.true;
    });

    it("Should not allow transfer of retired credit", async function () {
      await contract.connect(producer).retireCredit(1);
      
      await expect(contract.connect(producer).transferCredit(1, consumer.address))
        .to.be.revertedWith("Credit is already retired");
    });
  });

  describe("Credit Verification", function () {
    beforeEach(async function () {
      await contract.connect(producer).issueCredit(100);
      await contract.addAuditor(auditor.address);
    });

    it("Should allow auditor to verify credit", async function () {
      await expect(contract.connect(auditor).verifyCredit(1))
        .to.emit(contract, "CreditVerified")
        .withArgs(1, auditor.address);
      
      const credit = await contract.getCredit(1);
      expect(credit.isVerified).to.be.true;
    });

    it("Should not allow non-auditor to verify", async function () {
      await expect(contract.connect(consumer).verifyCredit(1))
        .to.be.revertedWith("Only auditors can perform this action");
    });
  });
});