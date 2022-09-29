import { expect } from "chai"
import { ethers } from "hardhat"
import Day from "dayjs"

import { deployMintdrop } from "../helpers"

describe("Mintdrop", () => {
  beforeEach(async function () {
    const [deployer, group, minter, other] = await ethers.getSigners()
    this.deployer = deployer
    this.group = group
    this.minter = minter
    this.other = other
  })

  describe("canPublicMint", async function () {
    it("should be true by default", async function () {
      const contract = await deployMintdrop()
      const canMint = await contract.canPublicMint(1)
      expect(canMint).to.eq(true)
    })

    it("should be false before a start time", async function () {
      const startTime = Day().add(1, "day").unix()
      const contract = await deployMintdrop({
        startTime
      })
      const canMint = await contract.connect(this.minter).canPublicMint(1)
      expect(canMint).to.eq(false)
    })

    it("should be true after a start time", async function () {
      const startTime = Day().subtract(1, "day").unix()
      const contract = await deployMintdrop({
        startTime
      })
      const canMint = await contract.connect(this.minter).canPublicMint(1)
      expect(canMint).to.eq(true)
    })

    it("should be false after an end time", async function () {
      const endTime = Day().subtract(1, "day").unix()
      const contract = await deployMintdrop({
        endTime
      })
      const canMint = await contract.connect(this.minter).canPublicMint(1)
      expect(canMint).to.eq(false)
    })

    it("should be true before an end time", async function () {
      const endTime = Day().add(1, "day").unix()
      const contract = await deployMintdrop({
        endTime
      })
      const canMint = await contract.connect(this.minter).canPublicMint(1)
      expect(canMint).to.eq(true)
    })

    it("should be true if maxSupply = 0", async function () {
      const contract = await deployMintdrop({
        maxSupply: 0
      })
      const canMint = await contract.connect(this.minter).canPublicMint(1)
      expect(canMint).to.eq(true)
    })

    it("should be true if minted < maxSupply", async function () {
      const contract = await deployMintdrop({
        maxSupply: 1
      })
      const canMint = await contract.connect(this.minter).canPublicMint(1)
      expect(canMint).to.eq(true)
    })

    it("should be false if minted > maxSupply", async function () {
      const contract = await deployMintdrop({
        maxSupply: 2
      })
      await contract.ownerMint(this.minter.address, 2)
      const supply = await contract.totalSupply()
      expect(supply).to.eq(2)

      const canMint = await contract
        .connect(this.minter)
        .canPublicMint(1)
        .catch(() => false)
      expect(canMint).to.eq(false)
    })
  })
})
