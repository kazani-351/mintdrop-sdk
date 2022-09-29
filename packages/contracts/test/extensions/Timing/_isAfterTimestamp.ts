import Day from "dayjs"
import { expect } from "chai"
import { ethers } from "hardhat"

import { deployContract } from "../../helpers"

describe("Timing", () => {
  beforeEach(async function () {
    const [deployer, group, minter, other] = await ethers.getSigners()
    this.deployer = deployer
    this.group = group
    this.minter = minter
    this.other = other

    this.contract = await deployContract("TimingMock", [])
  })

  describe("_isAfterTimestamp", async function () {
    it("should be false when before", async function () {
      expect(
        await this.contract.isAfterTimestamp(Day().add(1, "day").unix())
      ).to.eq(false)
    })

    it("should be true when after", async function () {
      expect(
        await this.contract.isAfterTimestamp(Day().subtract(1, "day").unix())
      ).to.eq(true)
    })

    it("should be true when equal", async function () {
      const timestamp = (await ethers.provider.getBlock("latest")).timestamp
      expect(await this.contract.isAfterTimestamp(timestamp)).to.eq(true)
    })
  })
})
