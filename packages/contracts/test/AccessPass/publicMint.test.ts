import { expect } from "chai"
import Day from "dayjs"
import { ethers } from "hardhat"
import moment from "moment"

import { deployAccessPass } from "../helpers"

describe("publicMint", () => {
  beforeEach(async function () {
    const [deployer, group, minter, other] = await ethers.getSigners()
    this.deployer = deployer
    this.group = group
    this.minter = minter
    this.other = other
  })

  describe("startTime", async function () {
    it("should not be mintable by default (startTime = 0)", async function () {
      const contract = await deployAccessPass({
        startTime: 0
      })
      const mintPromise = contract.connect(this.minter).publicMint(1)
      await expect(mintPromise).to.be.reverted
      expect(await contract.balanceOf(this.minter.address)).to.eq(0)
    })

    it("should disallow minting before a start time", async function () {
      const startTime = moment().add(1, "day").unix()
      const contract = await deployAccessPass({
        startTime
      })
      const mintPromise = contract.connect(this.minter).publicMint(1)
      await expect(mintPromise).to.be.revertedWith("MintNotStarted")
    })

    it("should allow minting after a start time", async function () {
      const startTime = moment().subtract(1, "day").unix()
      const contract = await deployAccessPass({
        startTime
      })
      const mintPromise = contract.connect(this.minter).publicMint(1)
      await expect(mintPromise).not.to.be.reverted
    })
  })

  describe("endTime", async function () {
    it("should be mintable when endTime = 0", async function () {
      const contract = await deployAccessPass({
        endTime: 0
      })
      const mintPromise = contract.connect(this.minter).publicMint(1)
      await expect(mintPromise).not.to.be.reverted
      expect(await contract.balanceOf(this.minter.address)).to.eq(1)
    })

    it("should allow minting before an end time", async function () {
      const endTime = Day().add(1, "day").unix()
      const contract = await deployAccessPass({
        endTime
      })
      const mintPromise = contract.connect(this.minter).publicMint(1)
      await expect(mintPromise).not.to.be.reverted
    })

    it("should disallow minting after an end time", async function () {
      const endTime = moment().subtract(1, "day").unix()
      const contract = await deployAccessPass({
        endTime
      })
      const mintPromise = contract.connect(this.minter).publicMint(1)
      await expect(mintPromise).to.be.revertedWith("MintCompleted")
    })
  })

  describe("maxPerWallet", async function () {
    // @todo should we limit max per wallet?
  })
})
