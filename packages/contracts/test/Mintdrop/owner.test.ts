import { sign } from "@mintdrop/sdk"
import { expect } from "chai"
import { ethers } from "hardhat"

import { deployMintdrop } from "../helpers"

describe("Mintdrop", function () {
  describe("ownerMint", async () => {
    beforeEach(async function () {
      const [deployer, group, minter, other] = await ethers.getSigners()
      this.deployer = deployer
      this.group = group
      this.minter = minter
      this.other = other

      this.contract = await deployMintdrop()
    })

    it("should be callable by the owner", async function () {
      await expect(this.contract.ownerMint(this.minter.address, 4)).to.not.be
        .reverted
      expect(await this.contract.totalSupply()).to.eq(4)
    })

    it("should NOT be callable by other wallets", async function () {
      await expect(
        this.contract.connect(this.minter).ownerMint(this.minter.address, 4)
      ).to.be.revertedWith("Ownable: caller is not the owner")
      expect(await this.contract.totalSupply()).to.eq(0)
    })
  })

  describe("airdrop", async () => {
    beforeEach(async function () {
      const [deployer, group, minter, other] = await ethers.getSigners()
      this.deployer = deployer
      this.group = group
      this.minter = minter
      this.other = other

      this.contract = await deployMintdrop()
    })

    it("should be callable by the owner", async function () {
      await expect(this.contract.airdrop([this.minter.address], [4])).to.not.be
        .reverted
      expect(await this.contract.totalSupply()).to.eq(4)
    })

    it("should NOT be callable by other wallets", async function () {
      await expect(
        this.contract.connect(this.minter).airdrop([this.minter.address], [4])
      ).to.be.revertedWith("Ownable: caller is not the owner")
      expect(await this.contract.totalSupply()).to.eq(0)
    })
  })

  describe("setAccessList", async () => {
    beforeEach(async function () {
      const [deployer, group, minter, other] = await ethers.getSigners()
      this.deployer = deployer
      this.group = group
      this.minter = minter
      this.other = other

      this.contract = await deployMintdrop()
    })

    it("should be callable by the owner", async function () {
      await expect(this.contract.setAccessList(this.group.address, 0, 0, 0)).to
        .not.be.reverted

      const list = await this.contract.accessLists(this.group.address)
      expect(list.exists).to.eq(true)
    })

    it("should NOT be callable by other wallets", async function () {
      await expect(
        this.contract
          .connect(this.minter)
          .setAccessList(this.group.address, 0, 0, 0)
      ).to.be.revertedWith("Ownable: caller is not the owner")
    })
  })

  describe("removeAccessList", async () => {
    beforeEach(async function () {
      const [deployer, group, minter, other] = await ethers.getSigners()
      this.deployer = deployer
      this.group = group
      this.minter = minter
      this.other = other

      this.contract = await deployMintdrop()
      await this.contract.setAccessList(this.group.address, 0, 0, 0)
    })

    it("should be callable by the owner", async function () {
      await expect(this.contract.removeAccessList(this.group.address)).to.not.be
        .reverted

      const list = await this.contract.accessLists(this.group.address)
      expect(list.exists).to.eq(false)
    })

    it("should NOT be callable by other wallets", async function () {
      await expect(
        this.contract.connect(this.minter).removeAccessList(this.group.address)
      ).to.be.revertedWith("Ownable: caller is not the owner")
    })
  })

  describe("pause", async () => {
    beforeEach(async function () {
      const [deployer, group, minter, other] = await ethers.getSigners()
      this.deployer = deployer
      this.group = group
      this.minter = minter
      this.other = other

      this.contract = await deployMintdrop()
    })

    it("should NOT be paused by default", async function () {
      expect(await this.contract.paused()).to.eq(false)
    })

    it("should be pausable by the owner", async function () {
      await expect(this.contract.pause()).to.not.be.reverted
      expect(await this.contract.paused()).to.eq(true)
    })

    it("should NOT be pausable by other wallets", async function () {
      await expect(
        this.contract.connect(this.minter).pause()
      ).to.be.revertedWith("Ownable: caller is not the owner")
    })

    describe("when paused", async function () {
      beforeEach(async function () {
        await this.contract.pause()
      })

      it("should NOT allow publicMint", async function () {
        await expect(
          this.contract.connect(this.minter).publicMint(1)
        ).to.be.revertedWith("Pausable: paused")
      })

      it("should NOT allow signatureMint", async function () {
        await this.contract.setAccessList(this.group.address, 0, 0, 0)
        const signature = sign(this.group, this.minter.address)

        await expect(
          this.contract.connect(this.minter).signatureMint(signature, 1)
        ).to.be.revertedWith("Pausable: paused")
      })

      it("should allow ownerMint", async function () {
        await expect(this.contract.ownerMint(this.minter.address, 1)).to.not.be
          .reverted
      })
    })
  })

  describe("unpause", async () => {
    beforeEach(async function () {
      const [deployer, group, minter, other] = await ethers.getSigners()
      this.deployer = deployer
      this.group = group
      this.minter = minter
      this.other = other

      this.contract = await deployMintdrop()

      await this.contract.pause()
    })

    it("should be unpausable by the owner", async function () {
      expect(await this.contract.paused()).to.eq(true)
      await expect(this.contract.unpause()).to.not.be.reverted
      expect(await this.contract.paused()).to.eq(false)
    })

    it("should NOT be unpausable by other wallets", async function () {
      await expect(
        this.contract.connect(this.minter).unpause()
      ).to.be.revertedWith("Ownable: caller is not the owner")
    })
  })

  describe("setRoyaltyInfo", async function () {
    beforeEach(async function () {
      const [deployer, group, minter, other] = await ethers.getSigners()
      this.deployer = deployer
      this.group = group
      this.minter = minter
      this.other = other

      this.contract = await deployMintdrop()
    })

    it("should be callable by the owner", async function () {
      await expect(this.contract.setRoyaltyInfo(this.deployer.address, 1000)).to
        .not.be.reverted

      await this.contract.ownerMint(this.minter.address, 1)
      const [address, amt] = await this.contract.royaltyInfo(1, 100)

      expect(address).to.eq(this.deployer.address)
      expect(amt).to.eq(10)
    })

    it("should NOT be callable by other wallets", async function () {
      await expect(
        this.contract
          .connect(this.minter)
          .setRoyaltyInfo(this.deployer.address, 1000)
      ).to.be.revertedWith("Ownable: caller is not the owner")
    })
  })

  describe("withdraw", async () => {
    beforeEach(async function () {
      const [deployer, group, minter, other] = await ethers.getSigners()
      this.deployer = deployer
      this.group = group
      this.minter = minter
      this.other = other

      const payouts = {
        addresses: [this.deployer.address, this.minter.address] as string[],
        shares: [9500, 500]
      }

      this.contract = await deployMintdrop({
        payouts
      })

      await this.contract.connect(this.minter).publicMint(1, {
        value: (100 * 1e18).toString()
      })
    })

    it("should be callable by the owner", async function () {
      await expect(this.contract.withdraw()).to.not.be.reverted
    })

    it("should distribute", async function () {
      expect(async () => {
        await this.contract.withdraw()
      }).to.changeEtherBalance(this.deployer.address, 95 * 1e18)
    })

    it("should NOT be callable by other wallets", async function () {
      await expect(
        this.contract.connect(this.minter).withdraw()
      ).to.be.revertedWith("Ownable: caller is not the owner")
    })
  })
})
