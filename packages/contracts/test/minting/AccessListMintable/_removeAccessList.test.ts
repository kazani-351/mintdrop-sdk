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

    this.contract = await deployContract("AccessListMintableMock", [[]])
  })

  describe("_removeAccessList", async function () {
    beforeEach(async function () {
      await this.contract.setAccessList(this.group.address, 0, 0, 0)
    })

    it("should exist (default check)", async function () {
      const group = await this.contract.accessLists(this.group.address)
      await expect(group.exists).to.eq(true)
    })

    it("should be removable", async function () {
      await this.contract.removeAccessList(this.group.address)
      const group = await this.contract.accessLists(this.group.address)
      await expect(group.exists).to.eq(false)
    })
  })
})
