import { expect } from "chai"
import { ethers } from "hardhat"
import Day from "dayjs"

import { deployContract } from "../../helpers"

async function deploy(
  opts: {
    mintPrice?: string
    startTime?: number
    maxPerWallet?: number
  } = {}
) {
  const {
    mintPrice = "0",
    startTime = Day().subtract(1, "day").unix(),
    maxPerWallet = 0
  } = opts
  return deployContract("PublicMintableMock", [
    [mintPrice, startTime, maxPerWallet]
  ])
}

describe("PublicMintable", () => {
  beforeEach(async function () {
    const [deployer, group, minter, other] = await ethers.getSigners()
    this.deployer = deployer
    this.group = group
    this.minter = minter
    this.other = other
  })

  describe("canPublicMint", async function () {
    it("should be false for 0 startTime (disabled)", async function () {
      const contract = await deploy({
        startTime: 0
      })
      const canMint = await contract.canPublicMint(1)
      expect(canMint).to.eq(false)
    })

    describe("startTime", async function () {
      it("should be false before a start time", async function () {
        const startTime = Day().add(1, "day").unix()
        const contract = await deploy({
          startTime
        })
        const canMint = await contract.connect(this.minter).canPublicMint(1)
        expect(canMint).to.eq(false)
      })

      it("should be true after a start time", async function () {
        const startTime = Day().subtract(1, "day").unix()
        const contract = await deploy({
          startTime
        })
        const canMint = await contract.connect(this.minter).canPublicMint(1)
        expect(canMint).to.eq(true)
      })
    })

    describe("maxPerWallet", async function () {
      it("should be true when 0 (unlimited)", async function () {
        const contract = await deploy({
          maxPerWallet: 0
        })

        expect(await contract.connect(this.minter).canPublicMint(1)).to.eq(true)
      })

      it("should be true when <= max", async function () {
        const contract = await deploy({
          maxPerWallet: 2
        })

        expect(await contract.connect(this.minter).canPublicMint(1)).to.eq(true)
        expect(await contract.connect(this.minter).canPublicMint(2)).to.eq(true)
      })

      it("should be false when > max", async function () {
        const contract = await deploy({
          maxPerWallet: 1
        })

        expect(await contract.connect(this.minter).canPublicMint(2)).to.eq(
          false
        )
      })

      it("should take into account already minted tokens", async function () {
        const contract = await deploy({
          maxPerWallet: 2
        })

        await contract.connect(this.minter).mint(1)

        expect(await contract.connect(this.minter).canPublicMint(1)).to.eq(true)
        expect(await contract.connect(this.minter).canPublicMint(2)).to.eq(
          false
        )
      })
    })
  })
})
