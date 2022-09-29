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

  describe("_setAccessList", async function () {
    beforeEach(async function () {
      await this.contract.setAccessList(this.group.address, 0, 0, 0)
    })

    it("should add the group", async function () {
      const notExisty = await this.contract.accessLists(
        "0x0123456789ABCEF0123456789ABCEF0123456789"
      )
      const added = await this.contract.accessLists(this.group.address)

      await expect(notExisty.exists).to.eq(false)
      await expect(added.exists).to.eq(true)
    })
  })
})
