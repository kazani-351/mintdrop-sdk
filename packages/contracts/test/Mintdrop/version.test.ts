import { expect } from "chai"
import { ethers } from "hardhat"

import { deployMintdrop } from "../helpers"

import pkg from "../../package.json"

describe("Mintdrop", () => {
  beforeEach(async function () {
    const [deployer, group, minter, other] = await ethers.getSigners()
    this.deployer = deployer
    this.group = group
    this.minter = minter
    this.other = other

    this.contract = await deployMintdrop()
  })

  describe("__mintdrop", async function () {
    it("should have the correct version", async function () {
      const version = await this.contract.__mintdrop()
      expect(version).to.eq(pkg.version)
    })
  })
})
