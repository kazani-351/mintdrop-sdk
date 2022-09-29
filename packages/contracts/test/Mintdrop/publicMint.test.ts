import { expect } from "chai"
import Day from "dayjs"
import { ethers } from "hardhat"

import { deployMintdrop } from "../helpers"

describe("Mintdrop", () => {
  beforeEach(async function () {
    const [deployer, group, minter, other] = await ethers.getSigners()
    this.deployer = deployer
    this.group = group
    this.minter = minter
    this.other = other
  })

  describe("publicMint", async function () {
    describe("startTime", async function () {
      it("should not be mintable by default (startTime = 0)", async function () {
        const contract = await deployMintdrop({
          startTime: 0
        })
        const mintPromise = contract.connect(this.minter).publicMint(1)
        await expect(mintPromise).to.be.reverted
        expect(await contract.balanceOf(this.minter.address)).to.eq(0)
      })

      it("should disallow minting before a start time", async function () {
        const startTime = Day().add(1, "day").unix()
        const contract = await deployMintdrop({
          startTime
        })
        const mintPromise = contract.connect(this.minter).publicMint(1)
        await expect(mintPromise).to.be.revertedWith(
          "Public Minting Has Not Started"
        )
      })

      it("should allow minting after a start time", async function () {
        const startTime = Day().subtract(1, "day").unix()
        const contract = await deployMintdrop({
          startTime
        })
        const mintPromise = contract.connect(this.minter).publicMint(1)
        await expect(mintPromise).not.to.be.reverted
      })
    })

    describe("endTime", async function () {
      it("should be mintable when endTime = 0", async function () {
        const contract = await deployMintdrop({
          endTime: 0
        })
        const mintPromise = contract.connect(this.minter).publicMint(1)
        await expect(mintPromise).not.to.be.reverted
        expect(await contract.balanceOf(this.minter.address)).to.eq(1)
      })

      it("should allow minting before an end time", async function () {
        const endTime = Day().add(1, "day").unix()
        const contract = await deployMintdrop({
          endTime
        })
        const mintPromise = contract.connect(this.minter).publicMint(1)
        await expect(mintPromise).not.to.be.reverted
      })

      it("should disallow minting after an end time", async function () {
        const endTime = Day().subtract(1, "day").unix()
        const contract = await deployMintdrop({
          endTime
        })
        const mintPromise = contract.connect(this.minter).publicMint(1)
        await expect(mintPromise).to.be.revertedWith("Mint Completed")
      })
    })

    describe("maxPerWallet", async function () {
      // @todo should we limit max per wallet?
    })
  })
})
