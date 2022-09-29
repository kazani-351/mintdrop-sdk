import { expect } from "chai"
import { ethers } from "hardhat"
import Day from "dayjs"

import { deployMintdrop } from "../helpers"

describe("Mintdrop", function () {
  describe("constructor", () => {
    beforeEach(async function () {
      const [deployer, group, minter, other] = await ethers.getSigners()
      this.deployer = deployer
      this.group = group
      this.minter = minter
      this.other = other
    })

    it("should set the name", async function () {
      const contract = await deployMintdrop({
        name: "Constructor Test"
      })
      expect(await contract.name()).to.eq("Constructor Test")
    })

    it("should set the symbol", async function () {
      const contract = await deployMintdrop({
        symbol: "CONSTRUCTOR"
      })
      expect(await contract.symbol()).to.eq("CONSTRUCTOR")
    })

    it("should set the maxSupply", async function () {
      const contract = await deployMintdrop({
        maxSupply: 1000
      })
      expect(await contract.maxSupply()).to.eq(1000)
    })

    it("should set the public mint config", async function () {
      const startTime = Day().add(1, "day").unix()
      const endTime = Day().add(1, "day").unix()

      const contract = await deployMintdrop({
        mintPrice: (0.1 * 1e18).toString(),
        startTime,
        endTime
      })
      const config = await contract.mintConfig()

      expect(config.startTime).to.eq(startTime.toString())
      expect(config.startTime).to.eq(endTime.toString())
    })

    it("should set the groups", async function () {
      const startTime = Day().add(1, "day").unix()

      const contract = await deployMintdrop({
        groups: [[this.group.address, (0.1 * 1e18).toString(), startTime, 0]]
      })
      const config = await contract.accessLists(this.group.address)
      expect(config.exists).to.eq(true)
      expect(config.mintCount).to.eq(0)

      expect(config.mintPrice).to.eq((0.1 * 1e18).toString())
      expect(config.startTime).to.eq(startTime.toString())
      expect(config.maxPerWallet).to.eq(0)
    })

    it("should set the payouts", async () => {
      const contract = await deployMintdrop({
        payouts: {
          addresses: ["0x000000000000000000000000000000000000dead"],
          shares: [10000]
        }
      })
      expect(await contract.withdrawAddresses(0)).to.eq(
        "0x000000000000000000000000000000000000dEaD"
      )
      expect(await contract.withdrawShares(0)).to.eq(10000)
    })

    it("should set the royalties", async () => {
      const contract = await deployMintdrop({
        royalties: {
          beneficiary: "0x000000000000000000000000000000000000dead",
          bips: 1000
        }
      })

      await contract.ownerMint("0x000000000000000000000000000000000000dEaD", 1)
      const [address, amt] = await contract.royaltyInfo(1, 100)

      expect(address).to.eq("0x000000000000000000000000000000000000dEaD")
      expect(amt).to.eq(10)
    })
  })
})
