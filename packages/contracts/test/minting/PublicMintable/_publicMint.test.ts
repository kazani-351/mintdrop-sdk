import { expect } from "chai"
import Day from "dayjs"
import { ethers } from "hardhat"

import { deployContract } from "../../helpers"

async function deploy(
  opts: {
    mintPrice?: string
    startTime?: number
    maxPerWallet?: number
  } = {}
) {
  const { mintPrice = "0", startTime = 0, maxPerWallet = 0 } = opts
  return deployContract("PublicMintableMock", [
    [mintPrice, startTime, maxPerWallet]
  ])
}

describe("PublicMintable", async function () {
  describe("_publicMint", () => {
    beforeEach(async function () {
      const [deployer, group, minter, other] = await ethers.getSigners()
      this.deployer = deployer
      this.group = group
      this.minter = minter
      this.other = other
    })

    describe("startTime", async function () {
      it("should not be mintable by default (startTime = 0)", async function () {
        const contract = await deploy()
        const mintPromise = contract.connect(this.minter).mint(1)
        await expect(mintPromise).to.be.reverted
        expect(await contract.balanceOf(this.minter.address)).to.eq(0)
      })

      it("should disallow minting before a start time", async function () {
        const startTime = Day().add(1, "day").unix()
        const contract = await deploy({ startTime })
        const mintPromise = contract.connect(this.minter).mint(1)
        await expect(mintPromise).to.be.revertedWith(
          "Public Minting Has Not Started"
        )
      })

      it("should allow minting after a start time", async function () {
        const startTime = Day().subtract(1, "day").unix()
        const contract = await deploy({ startTime })
        const mintPromise = contract.connect(this.minter).mint(1)
        await expect(mintPromise).not.to.be.reverted
      })
    })

    describe("mintPrice", async function () {
      beforeEach(async function () {
        this.contract = await deploy({
          startTime: Day().subtract(1, "day").unix(),
          mintPrice: (1e18).toString()
        })
      })

      it("should mint when price is correct for 1", async function () {
        await this.contract
          .connect(this.minter)
          .mint(1, { value: (1e18).toString() })
        expect(await this.contract.balanceOf(this.minter.address)).to.eq(1)
      })

      it("should mint when price is correct for 2+", async function () {
        await this.contract
          .connect(this.minter)
          .mint(2, { value: (2e18).toString() })
        expect(await this.contract.balanceOf(this.minter.address)).to.eq(2)
      })

      it("should NOT mint when msg.value is 0", async function () {
        await expect(
          this.contract.connect(this.minter).mint(2, { value: 0 })
        ).to.be.revertedWith("InsufficientPayment()")
        expect(await this.contract.balanceOf(this.minter.address)).to.eq(0)
      })

      it("should NOT mint when msg.value is incorrect", async function () {
        await expect(
          this.contract
            .connect(this.minter)
            .mint(2, { value: (1e18).toString() })
        ).to.be.revertedWith("InsufficientPayment()")
        expect(await this.contract.balanceOf(this.minter.address)).to.eq(0)
      })

      it("what should we do when value > mintPrice")
    })

    describe("maxPerWallet", async function () {
      beforeEach(async function () {
        this.contract = await deploy({
          startTime: Day().subtract(1, "day").unix(),
          maxPerWallet: 1
        })
      })

      it("should mint when not reached maxPerWallet", async function () {
        await this.contract
          .connect(this.minter)
          .mint(1, { value: (1e18).toString() })
        expect(await this.contract.balanceOf(this.minter.address)).to.eq(1)
      })

      it("should NOT mint when > maxPerWallet", async function () {
        await expect(
          this.contract.connect(this.minter).mint(2)
        ).to.be.revertedWith("Exceeds Max Per Wallet")

        await this.contract.connect(this.minter).mint(1)
        expect(await this.contract.balanceOf(this.minter.address)).to.eq(1)

        await expect(
          this.contract.connect(this.minter).mint(1)
        ).to.be.revertedWith("Exceeds Max Per Wallet")
      })
    })
  })
})
