import { sign } from "@mintdrop/sdk"
import { expect } from "chai"
import { ethers } from "hardhat"
import Day from "dayjs"

import { deployContract } from "../../helpers"

describe("Mintdrop", () => {
  describe("canSignatureMint", () => {
    beforeEach(async function () {
      const [deployer, group, minter, other] = await ethers.getSigners()
      this.deployer = deployer
      this.group = group
      this.minter = minter
      this.other = other

      this.signature = await sign(this.group, this.minter.address)
    })

    beforeEach(async function () {
      this.contract = await deployContract("AccessListMintableMock", [[]])
    })

    it("should be false if the group doesn't exist", async function () {
      const promise = this.contract
        .connect(this.minter)
        .canSignatureMint(this.signature, 1)
      await expect(promise).to.be.reverted
    })

    describe("startTime", async function () {
      it("should be true if startTime = 0", async function () {
        await this.contract.setAccessList(this.group.address, 0, 0, 0)
        const canMint = await this.contract
          .connect(this.minter)
          .canSignatureMint(this.signature, 1)
        expect(canMint).to.eq(true)
      })

      it("should be false before group start time", async function () {
        const startTime = Day().add(1, "day").unix()
        await this.contract.setAccessList(this.group.address, 0, startTime, 0)

        const canMint = await this.contract
          .connect(this.minter)
          .canSignatureMint(this.signature, 1)
          .catch(() => false)
        expect(canMint).to.eq(false)
      })

      it("should be true after group start time", async function () {
        const startTime = Day().subtract(1, "day").unix()
        await this.contract.setAccessList(this.group.address, 0, startTime, 0)

        const canMint = await this.contract
          .connect(this.minter)
          .canSignatureMint(this.signature, 1)
        expect(canMint).to.eq(true)
      })
    })

    describe("maxPerWallet", async function () {
      beforeEach(async function () {
        this.contract = await deployContract("AccessListMintableMock", [[]])
      })

      it("should be true if maxPerWallet = 0", async function () {
        await this.contract.setAccessList(this.group.address, 0, 0, 0)

        const canMint = await this.contract
          .connect(this.minter)
          .canSignatureMint(this.signature, 1)
        expect(canMint).to.eq(true)
      })

      it("should respect maxPerWallet", async function () {
        const maxPerWallet = 1
        await this.contract.setAccessList(
          this.group.address,
          0,
          0,
          maxPerWallet
        )

        expect(
          await this.contract
            .connect(this.minter)
            .canSignatureMint(this.signature, 1)
        ).to.eq(true)

        await this.contract.ownerMint(this.minter.address, 1)

        expect(
          await this.contract
            .connect(this.minter)
            .canSignatureMint(this.signature, 1)
            .catch(() => false)
        ).to.eq(false)
      })
    })
  })
})
