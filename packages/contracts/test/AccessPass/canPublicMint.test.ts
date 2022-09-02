import { expect } from "chai"
import { ethers } from "hardhat"
import moment from "moment"

import { deployAccessPass } from "../helpers"

describe("canMint", () => {
  beforeEach(async function () {
    const [deployer, group, minter, other] = await ethers.getSigners()
    this.deployer = deployer
    this.group = group
    this.minter = minter
    this.other = other
  })

  describe("canPublicMint", async function () {
    it("should be true by default", async function () {
      const contract = await deployAccessPass()
      const canMint = await contract.canPublicMint(1)
      expect(canMint).to.eq(true)
    })

    it("should be false before a start time", async function () {
      const startTime = moment().add(1, "day").unix()
      const contract = await deployAccessPass({
        startTime
      })
      const canMint = await contract
        .connect(this.minter)
        .canPublicMint(1)
        .catch(() => false)
      expect(canMint).to.eq(false)
    })

    it("should be true after a start time", async function () {
      const startTime = moment().subtract(1, "day").unix()
      const contract = await deployAccessPass({
        startTime
      })
      const canMint = await contract.connect(this.minter).canPublicMint(1)
      expect(canMint).to.eq(true)
    })

    it("should be false after an end time", async function () {
      const endTime = moment().subtract(1, "day").unix()
      const contract = await deployAccessPass({
        endTime
      })
      const canMint = await contract
        .connect(this.minter)
        .canPublicMint(1)
        .catch(() => false)
      expect(canMint).to.eq(false)
    })

    it("should be true before an end time", async function () {
      const endTime = moment().add(1, "day").unix()
      const contract = await deployAccessPass({
        endTime
      })
      const canMint = await contract.connect(this.minter).canPublicMint(1)
      expect(canMint).to.eq(true)
    })

    it("should be true if maxSupply = 0", async function () {
      const contract = await deployAccessPass({
        maxSupply: 0
      })
      const canMint = await contract.connect(this.minter).canPublicMint(1)
      expect(canMint).to.eq(true)
    })

    it("should be true if minted < maxSupply", async function () {
      const contract = await deployAccessPass({
        maxSupply: 1
      })
      const canMint = await contract.connect(this.minter).canPublicMint(1)
      expect(canMint).to.eq(true)
    })

    it("should be false if minted > maxSupply", async function () {
      const contract = await deployAccessPass({
        maxSupply: 2
      })
      await contract.ownerMint(this.minter.address, 2)
      const canMint = await contract
        .connect(this.minter)
        .canPublicMint(1)
        .catch(() => false)
      expect(canMint).to.eq(false)
    })
  })
})
