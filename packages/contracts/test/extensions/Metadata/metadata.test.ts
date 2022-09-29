import { expect } from "chai"
import { ethers } from "hardhat"

import { deployContract } from "../../helpers"

describe("Groups", () => {
  beforeEach(async function () {
    const [deployer, group, minter, other] = await ethers.getSigners()
    this.deployer = deployer
    this.group = group
    this.minter = minter
    this.other = other

    this.contract = await deployContract("MetadataMock", [])
  })

  describe("constructor", async function () {
    it("should add the group", async function () {
      const tokenURI = await this.contract.baseTokenURI()
      await expect(tokenURI).to.eq("https://meta.mintdrop.xyz/123/")
    })
  })

  describe("_setBaseTokenURI", async function () {
    it("should change the token URI", async function () {
      await this.contract.setBaseTokenURI("https://test.com/")
      const tokenURI = await this.contract.baseTokenURI()
      await expect(tokenURI).to.eq("https://test.com/")
    })
  })

  describe("ERC721.tokenURI", async function () {
    beforeEach(async function () {
      await this.contract.fakeMint()
    })

    it("should use the base URI", async function () {
      const supply = await this.contract.totalSupply()
      expect(supply.toNumber()).to.eq(1)
      const tokenURI = await this.contract.tokenURI(1)
      expect(tokenURI).to.eq("https://meta.mintdrop.xyz/123/1")
    })
  })
})
