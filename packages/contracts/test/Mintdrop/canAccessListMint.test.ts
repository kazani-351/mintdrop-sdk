import { sign } from "@mintdrop/sdk"
import { expect } from "chai"
import { ethers } from "hardhat"
import Day from "dayjs"

import { deployMintdrop } from "../helpers"

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
      this.contract = await deployMintdrop()
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

    describe("endTime", async function () {
      it("should be false after an end time", async function () {
        const endTime = Day().subtract(1, "day").unix()

        const contract = await deployMintdrop({
          endTime
        })
        await contract.setAccessList(this.group.address, 0, 0, 0)

        expect(
          await contract
            .connect(this.minter)
            .canSignatureMint(this.signature, 1)
            .catch(() => false)
        ).to.eq(false)
      })

      it("should be true before an end time", async function () {
        const endTime = Day().add(1, "day").unix()

        const contract = await deployMintdrop({
          endTime
        })
        await contract.setAccessList(this.group.address, 0, 0, 0)

        expect(
          await contract
            .connect(this.minter)
            .canSignatureMint(this.signature, 1)
        ).to.eq(true)
      })
    })

    describe("maxPerWallet", async function () {
      beforeEach(async function () {
        this.contract = await deployMintdrop({})
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

    describe("maxSupply", async function () {
      it("should be true if maxSupply = 0", async function () {
        const contract = await deployMintdrop({
          maxSupply: 0
        })
        await contract.setAccessList(this.group.address, 0, 0, 0)

        const canMint = await contract
          .connect(this.minter)
          .canSignatureMint(this.signature, 1)
        expect(canMint).to.eq(true)
      })

      it("should be true if minted < maxSupply", async function () {
        const contract = await deployMintdrop({
          maxSupply: 1
        })
        await contract.setAccessList(this.group.address, 0, 0, 0)

        const canMint = await contract
          .connect(this.minter)
          .canSignatureMint(this.signature, 1)
        expect(canMint).to.eq(true)
      })

      it("should be false if minted > maxSupply", async function () {
        const contract = await deployMintdrop({
          maxSupply: 2
        })
        await contract.setAccessList(this.group.address, 0, 0, 0)

        await contract.ownerMint(this.minter.address, 2)
        const canMint = await contract
          .connect(this.minter)
          .canSignatureMint(this.signature, 1)
          .catch(() => false)
        expect(canMint).to.eq(false)
      })
    })
  })
})
