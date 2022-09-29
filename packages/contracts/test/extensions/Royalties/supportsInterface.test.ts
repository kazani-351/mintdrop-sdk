import { expect } from "chai"
import { ethers } from "hardhat"

import { deployContract } from "../../helpers"

describe("Royalties", () => {
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

  describe("supportsInterface", async function () {
    it("supports ERC721", async function () {
      expect(await this.contract.supportsInterface("0x80ac58cd")).to.eq(true)
    })

    it("supports ERC29821", async function () {
      expect(await this.contract.supportsInterface("0x2a55205a")).to.eq(true)
    })

    it("should be false for other things", async function () {
      expect(await this.contract.supportsInterface("0x00000000")).to.eq(false)
    })
  })
})
