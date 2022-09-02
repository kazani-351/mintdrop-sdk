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

    this.contract = await deployContract("SignatureMintableMock", [])
  })

  describe("_removeGroup", async function () {
    beforeEach(async function () {
      await this.contract.addGroup(this.group.address, 0, 0, 0)
    })

    it("should exist (default check)", async function () {
      const group = await this.contract.groups(this.group.address)
      await expect(group.exists).to.eq(true)
    })

    it("should be removable", async function () {
      await this.contract.removeGroup(this.group.address)
      const group = await this.contract.groups(this.group.address)
      await expect(group.exists).to.eq(false)
    })
  })
})
