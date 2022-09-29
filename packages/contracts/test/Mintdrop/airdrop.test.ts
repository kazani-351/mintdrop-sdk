import { expect } from "chai"
import { ethers } from "hardhat"

import { deployMintdrop } from "../helpers"

describe("Mintdrop", function () {
  describe("airdrop", async () => {
    beforeEach(async function () {
      const [deployer, group, minter, other] = await ethers.getSigners()
      this.deployer = deployer
      this.group = group
      this.minter = minter
      this.other = other
    })

    it("should airdrop the tokens", async function () {
      const contract = await deployMintdrop()

      await expect(
        contract.airdrop([this.minter.address, this.other.address], [4, 6])
      ).to.not.be.reverted

      expect(await contract.totalSupply()).to.eq(10)
      expect(await contract.balanceOf(this.minter.address)).to.eq(4)
      expect(await contract.balanceOf(this.other.address)).to.eq(6)
    })

    it("should fail if > maxSupply", async function () {
      const contract = await deployMintdrop({
        maxSupply: 2
      })

      await expect(
        contract.airdrop([this.minter.address, this.other.address], [1, 2])
      ).to.be.revertedWith("Exceeds Max Supply")
    })

    it("should fail if recipients and counts are diff sizes", async function () {
      const contract = await deployMintdrop()

      await expect(
        contract.airdrop([this.minter.address], [1, 2, 3])
      ).to.be.revertedWith("Recipients and counts are diff sizes")
    })
  })
})
