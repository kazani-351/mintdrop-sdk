import { expect } from "chai"
import { ethers } from "hardhat"

import { deployMintdrop } from "../helpers"

describe("Mintdrop", function () {
  describe("_startTokenId", async () => {
    beforeEach(async function () {
      const [deployer, group, minter, other] = await ethers.getSigners()
      this.deployer = deployer
      this.group = group
      this.minter = minter
      this.other = other
    })

    it("should start with tokenId 1", async function () {
      const contract = await deployMintdrop()
      await contract.ownerMint(this.minter.address, 1)

      await expect(contract.ownerOf(0)).to.be.revertedWith(
        "OwnerQueryForNonexistentToken"
      )

      expect(await contract.ownerOf(1)).to.eq(this.minter.address)
    })

    it("should be overridable", async function () {
      const contract = await deployMintdrop({ contractName: "StartTokenMock" })
      await contract.ownerMint(this.minter.address, 1)

      await expect(contract.ownerOf(0)).to.be.revertedWith(
        "OwnerQueryForNonexistentToken"
      )
      await expect(contract.ownerOf(1)).to.be.revertedWith(
        "OwnerQueryForNonexistentToken"
      )

      expect(await contract.ownerOf(1000)).to.eq(this.minter.address)
    })
  })
})
