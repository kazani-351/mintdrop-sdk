import Day from "dayjs"
import { expect } from "chai"
import { ethers } from "hardhat"

import { deployContract } from "../../helpers"

describe("AccessListMintable", () => {
  beforeEach(async function () {
    const [deployer, group, minter, other] = await ethers.getSigners()
    this.deployer = deployer
    this.group = group
    this.minter = minter
    this.other = other

    this.contract = await deployContract("AccessListMintableMock", [[]])
  })

  describe("_hasAccessListStarted", async function () {
    it("should be started when timestamp = 0", async function () {
      await this.contract.setAccessList(this.group.address, 0, 0, 0)
      const started = await this.contract.isGroupStarted(this.group.address)
      await expect(started).to.eq(true)
    })

    it("should NOT be started when timestamp is in the future", async function () {
      await this.contract.setAccessList(
        this.group.address,
        0,
        Day().add(1, "day").unix(),
        0
      )
      const started = await this.contract.isGroupStarted(this.group.address)
      await expect(started).to.eq(false)
    })

    it("should be started when timestamp is in the past", async function () {
      await this.contract.setAccessList(
        this.group.address,
        0,
        Day().subtract(1, "day").unix(),
        0
      )
      const started = await this.contract.isGroupStarted(this.group.address)
      await expect(started).to.eq(true)
    })

    it("should NOT be started within 15 seconds of the block timestamp")
    it("should be started 15 seconds after the block timestamp")
  })
})
