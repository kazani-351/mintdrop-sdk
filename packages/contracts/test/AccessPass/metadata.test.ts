import { expect } from "chai"
import { ethers } from "hardhat"

import { deployAccessPass } from "../helpers"

describe("metadata", () => {
  beforeEach(async function () {
    const [deployer, group, minter, other] = await ethers.getSigners()
    this.deployer = deployer
    this.group = group
    this.minter = minter
    this.other = other

    this.contract = await deployAccessPass()
  })

  describe("tokenURI", async function () {
    beforeEach(async function () {
      await this.contract.ownerMint(this.other.address, 1)
      const supply = await this.contract.totalSupply()
      expect(supply).to.eq(1)
    })

    it("should have the correct baseURI", async function () {
      const tokenURI = await this.contract.tokenURI(1)
      expect(tokenURI).to.eq("https://mintdrop.example/1")
    })
  })

  describe("setBaseTokenURI", async function () {
    beforeEach(async function () {
      await this.contract.ownerMint(this.other.address, 1)
      const supply = await this.contract.totalSupply()
      expect(supply).to.eq(1)
    })

    it("should have the correct baseURI", async function () {
      let tokenURI = await this.contract.tokenURI(1)
      expect(tokenURI).to.eq("https://mintdrop.example/1")
      await this.contract.setBaseTokenURI("https://fake.example/")
      tokenURI = await this.contract.tokenURI(1)
      expect(tokenURI).to.eq("https://fake.example/1")
    })
  })
})
