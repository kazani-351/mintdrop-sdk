import { expect } from "chai"
import { ethers } from "hardhat"

import { deployContract } from "../helpers"

describe("Groups", () => {
  beforeEach(async function () {
    const [deployer, group, minter, other] = await ethers.getSigners()
    this.deployer = deployer
    this.group = group
    this.minter = minter
    this.other = other

    this.contract = await deployContract("RoyaltiesMock", [
      this.deployer.address,
      1000 // 10%
    ])
  })

  describe("ERC2981.royaltyInfo", async function () {
    beforeEach(async function () {
      await this.contract.fakeMint()
    })

    it("have the correct royalties", async function () {
      const royalties = await this.contract.royaltyInfo(
        0,
        (100 * 1e18).toString()
      )
      expect(royalties[0]).to.eq(this.deployer.address)
      expect(royalties[1].toString()).to.eq((10 * 1e18).toString())
    })
  })
})
