import { expect } from "chai"
import { ethers } from "hardhat"

import { deployContract } from "../helpers"

describe("Groups", () => {
  beforeEach(async function () {
    const [deployer, group, minter, mintdrop] = await ethers.getSigners()
    this.deployer = deployer
    this.group = group
    this.minter = minter
    this.mintdrop = mintdrop
  })

  describe("constructor", async function () {
    it("set the payouts for a single payout", async function () {
      const payouts = [[this.deployer.address], [100]]

      const contract = await deployContract("PayoutsMock", [payouts])

      const address = await contract.withdrawAddresses(0)
      expect(address).to.eq(this.deployer.address)

      const shares = await contract.withdrawPercentages(0)
      expect(shares).to.eq(100)
    })

    it("set the payouts for multiple", async function () {
      const payouts = [
        [this.deployer.address, this.mintdrop.address],
        [95, 5]
      ]

      const contract = await deployContract("PayoutsMock", [payouts])

      expect(await contract.withdrawAddresses(0)).to.eq(this.deployer.address)
      expect(await contract.withdrawPercentages(0)).to.eq(95)

      expect(await contract.withdrawAddresses(1)).to.eq(this.mintdrop.address)
      expect(await contract.withdrawPercentages(1)).to.eq(5)
    })
  })

  describe("withdraw", async function () {
    beforeEach(async function () {
      const payouts = [
        [this.deployer.address, this.mintdrop.address],
        [95, 5]
      ]

      this.contract = await deployContract("PayoutsMock", [payouts])
    })

    it("should send payouts to the right addresses", async function () {
      expect(
        await this.contract.provider.getBalance(this.contract.address)
      ).to.eq(0)

      expect(async () => {
        await this.contract.connect(this.minter).mint({
          value: (100 * 1e18).toString()
        })
      }).to.changeEtherBalance(this.contract.address, 100 * 1e18)

      expect(async () => this.contract.withdraw()).to.changeEtherBalances(
        [this.deployer.address, this.mintdrop.address],
        [95 * 1e18, 5 * 1e18]
      )
    })
  })
})
