import { expect } from "chai"
import { ethers } from "hardhat"
import moment from "moment"

import { deployAccessPass } from "../helpers"

describe("constructor", () => {
  beforeEach(async function () {
    const [deployer, group, minter, other] = await ethers.getSigners()
    this.deployer = deployer
    this.group = group
    this.minter = minter
    this.other = other
  })

  describe("constructor", async function () {
    it("should set the name", async function () {
      const contract = await deployAccessPass({
        name: "Constructor Test"
      })
      expect(await contract.name()).to.eq("Constructor Test")
    })

    it("should set the symbol", async function () {
      const contract = await deployAccessPass({
        symbol: "CONSTRUCTOR"
      })
      expect(await contract.symbol()).to.eq("CONSTRUCTOR")
    })

    it("should set the maxSupply", async function () {
      const contract = await deployAccessPass({
        maxSupply: 1000
      })
      expect(await contract.maxSupply()).to.eq(1000)
    })

    it("should set the public mint config", async function () {
      const startTime = moment().add(1, "day").unix()
      const endTime = moment().add(1, "day").unix()

      const contract = await deployAccessPass({
        mintPrice: (0.1 * 1e18).toString(),
        startTime,
        endTime
      })
      const config = await contract.mintConfig()

      expect(config.startTime).to.eq(startTime.toString())
      expect(config.startTime).to.eq(endTime.toString())
    })

    it("should set the groups", async function () {
      const startTime = moment().add(1, "day").unix()

      const contract = await deployAccessPass({
        groups: [[this.group.address, (0.1 * 1e18).toString(), startTime, 0]]
      })
      const config = await contract.groups(this.group.address)
      expect(config.exists).to.eq(true)
      expect(config.mintCount).to.eq(0)

      expect(config.mintPrice).to.eq((0.1 * 1e18).toString())
      expect(config.startTime).to.eq(startTime.toString())
      expect(config.maxPerWallet).to.eq(0)
    })
  })
})
