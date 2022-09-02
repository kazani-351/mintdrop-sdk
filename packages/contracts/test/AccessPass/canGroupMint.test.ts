import { sign } from "@mintdrop/sdk"
import { expect } from "chai"
import { ethers } from "hardhat"
import moment from "moment"

import { deployAccessPass, DeployAccessPassProps } from "../helpers"

describe("canMint", () => {
  beforeEach(async function () {
    const [deployer, group, minter, other] = await ethers.getSigners()
    this.deployer = deployer
    this.group = group
    this.minter = minter
    this.other = other

    this.signature = await sign(this.group, this.minter.address)
  })

  describe("canGroupMint", async function () {
    beforeEach(async function () {
      this.contract = await deployAccessPass()
    })

    it("should be false if the group doesn't exist", async function () {
      const promise = this.contract
        .connect(this.minter)
        .canGroupMint(this.signature, 1)

      await expect(promise).to.be.reverted
    })

    describe("startTime", async function () {
      it("should be true if startTime = 0", async function () {
        await this.contract.addGroup(this.group.address, 0, 0, 0)

        const canMint = await this.contract
          .connect(this.minter)
          .canGroupMint(this.signature, 1)
        expect(canMint).to.eq(true)
      })

      it("should be false before group start time", async function () {
        const startTime = moment().add(1, "day").unix()
        await this.contract.addGroup(this.group.address, 0, startTime, 0)

        const canMint = await this.contract
          .connect(this.minter)
          .canGroupMint(this.signature, 1)
          .catch(() => false)
        expect(canMint).to.eq(false)
      })

      it("should be true after group start time", async function () {
        const startTime = moment().subtract(1, "day").unix()
        await this.contract.addGroup(this.group.address, 0, startTime, 0)

        const canMint = await this.contract
          .connect(this.minter)
          .canGroupMint(this.signature, 1)
        expect(canMint).to.eq(true)
      })
    })

    describe("endTime", async function () {
      it("should be false after an end time", async function () {
        const endTime = moment().subtract(1, "day").unix()

        const contract = await deployAccessPass({
          endTime
        })
        await contract.addGroup(this.group.address, 0, 0, 0)

        expect(
          await contract
            .connect(this.minter)
            .canGroupMint(this.signature, 1)
            .catch(() => false)
        ).to.eq(false)
      })

      it("should be true before an end time", async function () {
        const endTime = moment().add(1, "day").unix()

        const contract = await deployAccessPass({
          endTime
        })
        await contract.addGroup(this.group.address, 0, 0, 0)

        expect(
          await contract.connect(this.minter).canGroupMint(this.signature, 1)
        ).to.eq(true)
      })
    })

    describe("maxPerWallet", async function () {
      beforeEach(async function () {
        this.contract = await deployAccessPass({})
      })

      it("should be true if maxPerWallet = 0", async function () {
        await this.contract.addGroup(this.group.address, 0, 0, 0)

        const canMint = await this.contract
          .connect(this.minter)
          .canGroupMint(this.signature, 1)
        expect(canMint).to.eq(true)
      })

      it("should respect maxPerWallet", async function () {
        const maxPerWallet = 1
        await this.contract.addGroup(this.group.address, 0, 0, maxPerWallet)

        expect(
          await this.contract
            .connect(this.minter)
            .canGroupMint(this.signature, 1)
        ).to.eq(true)

        await this.contract.ownerMint(this.minter.address, 1)

        expect(
          await this.contract
            .connect(this.minter)
            .canGroupMint(this.signature, 1)
            .catch(() => false)
        ).to.eq(false)
      })
    })

    describe("maxSupply", async function () {
      it("should be true if maxSupply = 0", async function () {
        const contract = await deployAccessPass({
          maxSupply: 0
        })
        await contract.addGroup(this.group.address, 0, 0, 0)

        const canMint = await contract
          .connect(this.minter)
          .canGroupMint(this.signature, 1)
        expect(canMint).to.eq(true)
      })

      it("should be true if minted < maxSupply", async function () {
        const contract = await deployAccessPass({
          maxSupply: 1
        })
        await contract.addGroup(this.group.address, 0, 0, 0)

        const canMint = await contract
          .connect(this.minter)
          .canGroupMint(this.signature, 1)
        expect(canMint).to.eq(true)
      })

      it("should be false if minted > maxSupply", async function () {
        const contract = await deployAccessPass({
          maxSupply: 2
        })
        await contract.addGroup(this.group.address, 0, 0, 0)

        await contract.ownerMint(this.minter.address, 2)
        const canMint = await contract
          .connect(this.minter)
          .canGroupMint(this.signature, 1)
          .catch(() => false)
        expect(canMint).to.eq(false)
      })
    })
  })
})
