import { sign } from "@mintdrop/sdk"
import { expect } from "chai"
import { ethers } from "hardhat"
import moment from "moment"

import { deployAccessPass } from "../helpers"

describe("Groups", () => {
  beforeEach(async function () {
    const [deployer, group, minter, other] = await ethers.getSigners()
    this.deployer = deployer
    this.group = group
    this.minter = minter
    this.other = other

    this.contract = await deployAccessPass({})
  })

  describe("groupMint", async function () {
    beforeEach(async function () {
      await this.contract.addGroup(this.group.address, 0, 0, 0)
    })

    it("should be mintable", async function () {
      const signature = sign(this.group, this.minter.address)
      const mintPromise = this.contract
        .connect(this.minter)
        .groupMint(signature, 1)
      await expect(mintPromise).to.not.be.reverted
      expect(await this.contract.balanceOf(this.minter.address)).to.eq(1)
    })

    it("can only be minted by msg.sender", async function () {
      const signature = sign(this.group, this.minter.address)
      // mint with `other`, not `minter`
      const mintPromise = this.contract
        .connect(this.other)
        .groupMint(signature, 1)
      await expect(mintPromise).to.be.revertedWith("InvalidSignature")
      expect(await this.contract.balanceOf(this.minter.address)).to.eq(0)
    })

    it("should set the message as used x times", async function () {
      const signature = sign(this.group, this.minter.address)
      await this.contract.connect(this.minter).groupMint(signature, 1)
      expect(await this.contract.balanceOf(this.minter.address)).to.eq(1)
    })

    it("should reject invalid signatures", async function () {
      // sign with `other`, not `group`
      const signature = sign(this.other, this.minter.address)
      const mintPromise = this.contract
        .connect(this.minter)
        .groupMint(signature, 1)
      await expect(mintPromise).to.be.revertedWith("InvalidSignature")
      expect(await this.contract.balanceOf(this.minter.address)).to.eq(0)
    })

    describe("startTime", async function () {
      it("should allow minting if no start time set", async function () {
        await this.contract.addGroup(this.group.address, 0, 0, 0)
        const signature = sign(this.group, this.minter.address)
        const mintPromise = this.contract
          .connect(this.minter)
          .groupMint(signature, 1)
        await expect(mintPromise).not.to.be.reverted
      })

      it("should disallow minting before a start time", async function () {
        const time = moment().add(1, "day").unix()
        await this.contract.addGroup(this.group.address, 0, time, 0)
        const signature = sign(this.group, this.minter.address)
        const mintPromise = this.contract
          .connect(this.minter)
          .groupMint(signature, 1)
        await expect(mintPromise).to.be.revertedWith("MintNotStarted")
      })

      it("should allow minting after a start time", async function () {
        const time = moment().subtract(1, "day").unix()
        await this.contract.addGroup(this.group.address, 0, time, 0)
        const signature = sign(this.group, this.minter.address)
        const mintPromise = this.contract
          .connect(this.minter)
          .groupMint(signature, 1)
        await expect(mintPromise).not.to.be.reverted
      })
    })

    describe("maxPerWallet", async function () {
      it("should allow minting if maxPerWallet = 0", async function () {
        await this.contract.addGroup(this.group.address, 0, 0, 0)
        const signature = sign(this.group, this.minter.address)
        const mintPromise = this.contract
          .connect(this.minter)
          .groupMint(signature, 1)
        await expect(mintPromise).not.to.be.reverted
      })
      it("should allow minting if < maxPerWallet", async function () {
        await this.contract.addGroup(this.group.address, 0, 0, 1)
        const signature = sign(this.group, this.minter.address)
        const mintPromise = this.contract
          .connect(this.minter)
          .groupMint(signature, 1)
        await expect(mintPromise).not.to.be.reverted
      })
      it("should disallow minting if > maxPerWallet", async function () {
        await this.contract.addGroup(this.group.address, 0, 0, 1)
        const signature = sign(this.group, this.minter.address)
        const mintPromise = this.contract
          .connect(this.minter)
          .groupMint(signature, 2)
        await expect(mintPromise).to.be.revertedWith("ExceedsMaxPerWallet")
      })
    })

    describe("reserveCount", async function () {
      it("todo")
    })
  })
})
