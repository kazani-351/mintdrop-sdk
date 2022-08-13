import { expect } from "chai"
import { ethers } from "hardhat"
import moment from "moment"

import { sign } from "../../dist/index"
import { deployContract } from "../helpers.js"

describe("Groups", () => {
  beforeEach(async function () {
    const [deployer, group, minter, other] = await ethers.getSigners()
    this.deployer = deployer
    this.group = group
    this.minter = minter
    this.other = other

    this.contract = await deployContract("GroupsMock", ["GroupsMock", "MOCK"])
  })

  describe("with no groups", async function () {
    it("should fail when trying to mint with any signature", async function () {
      const signature = sign(this.minter, this.minter.address)

      const mintPromise = this.contract.connect(this.minter).mint(signature, 1)
      await expect(mintPromise).to.be.reverted

      expect(await this.contract.balanceOf(this.minter.address)).to.eq(0)
    })
  })

  describe("_addGroup", async function () {
    beforeEach(async function () {
      await this.contract.addGroup(this.group.address, 0, 0, 0)
    })

    it("should add the group", async function () {
      const notExisty = await this.contract.groups(
        "0x0123456789ABCEF0123456789ABCEF0123456789"
      )
      const added = await this.contract.groups(this.group.address)

      await expect(notExisty.exists).to.eq(false)
      await expect(added.exists).to.eq(true)
    })
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

    it("should not be mintable", async function () {
      await this.contract.removeGroup(this.group.address)
      const signature = sign(this.group, this.minter.address)
      const mintPromise = this.contract.connect(this.minter).mint(signature, 1)
      await expect(mintPromise).to.be.revertedWith("InvalidSignature")
    })
  })

  describe("_groupMint", async function () {
    beforeEach(async function () {
      await this.contract.addGroup(this.group.address, 0, 0, 0)
    })

    describe("successfully", async function () {
      it("should be mintable", async function () {
        const signature = sign(this.group, this.minter.address)

        const mintPromise = this.contract
          .connect(this.minter)
          .mint(signature, 1)
        await expect(mintPromise).to.not.be.reverted

        expect(await this.contract.balanceOf(this.minter.address)).to.eq(1)
      })
    })

    describe("error cases", async function () {
      it("can only be minted by msg.sender", async function () {
        const signature = sign(this.group, this.minter.address)
        // mint with `other`, not `minter`
        const mintPromise = this.contract.connect(this.other).mint(signature, 1)
        await expect(mintPromise).to.be.revertedWith("InvalidSignature")
        expect(await this.contract.balanceOf(this.minter.address)).to.eq(0)
      })

      it("should reject invalid signatures", async function () {
        // sign with `other`, not `group`
        const signature = sign(this.other, this.minter.address)
        const mintPromise = this.contract
          .connect(this.minter)
          .mint(signature, 1)
        await expect(mintPromise).to.be.revertedWith("InvalidSignature")
        expect(await this.contract.balanceOf(this.minter.address)).to.eq(0)
      })
    })

    describe("startTime", async function () {
      it("should allow minting if no start time set", async function () {
        await this.contract.addGroup(this.group.address, 0, 0, 0)
        const signature = sign(this.group, this.minter.address)
        const mintPromise = this.contract
          .connect(this.minter)
          .mint(signature, 1)
        await expect(mintPromise).not.to.be.reverted
      })

      it("should disallow minting before a start time", async function () {
        const time = moment().add(1, "day").unix()
        await this.contract.addGroup(this.group.address, time, 0, 0)
        const signature = sign(this.group, this.minter.address)
        const mintPromise = this.contract
          .connect(this.minter)
          .mint(signature, 1)
        await expect(mintPromise).to.be.revertedWith("MintNotStarted")
      })

      it("should allow minting after a start time", async function () {
        const time = moment().subtract(1, "day").unix()
        await this.contract.addGroup(this.group.address, time, 0, 0)
        const signature = sign(this.group, this.minter.address)
        const mintPromise = this.contract
          .connect(this.minter)
          .mint(signature, 1)
        await expect(mintPromise).not.to.be.reverted
      })
    })

    describe("maxPerWallet", async function () {
      it("should allow minting if maxPerWallet = 0", async function () {
        await this.contract.addGroup(this.group.address, 0, 0, 0)
        const signature = sign(this.group, this.minter.address)
        const mintPromise = this.contract
          .connect(this.minter)
          .mint(signature, 1)
        await expect(mintPromise).not.to.be.reverted
      })
      it("should allow minting if < maxPerWallet", async function () {
        await this.contract.addGroup(this.group.address, 0, 0, 1)
        const signature = sign(this.group, this.minter.address)
        const mintPromise = this.contract
          .connect(this.minter)
          .mint(signature, 1)
        await expect(mintPromise).not.to.be.reverted
      })
      it("should disallow minting if > maxPerWallet", async function () {
        await this.contract.addGroup(this.group.address, 0, 0, 1)
        const signature = sign(this.group, this.minter.address)
        const mintPromise = this.contract
          .connect(this.minter)
          .mint(signature, 2)
        await expect(mintPromise).to.be.revertedWith("ExceedsGroupMaxPerWallet")
      })
    })

    describe("reserveCount", async function () {
      it("todo")
    })
  })

  describe("_safeGroupMint", async function () {
    it("todo")
  })

  // describe("_hasMinted", async function () {
  //   beforeEach(async function () {
  //     await this.contract.addGroup(this.group.address, 0, 0, 0)
  //     const signature = sign(this.group, this.minter.address)
  //     await this.contract.connect(this.minter).mint(signature, 1)
  //   })

  //   it("should be true if minted", async function () {
  //     expect(await this.contract.hasMinted(this.minter.address)).to.eq(true)
  //   })

  //   it("should be false if not minted", async function () {
  //     expect(await this.contract.hasMinted(this.other.address)).to.eq(false)
  //   })
  // })

  describe("_groupCount", async function () {
    beforeEach(async function () {
      await this.contract.addGroup(this.group.address, 0, 0, 0)
    })

    it("should be 0 by default", async function () {
      expect(await this.contract.groupCount(this.group.address)).to.eq(0)
    })

    it("should increment the mint count for the group", async function () {
      const signature = sign(this.group, this.minter.address)
      await this.contract.connect(this.minter).mint(signature, 1)

      expect(await this.contract.groupCount(this.group.address)).to.eq(1)
    })
  })
})
