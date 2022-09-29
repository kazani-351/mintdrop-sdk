import { sign } from "@mintdrop/sdk"
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
    await this.contract.setAccessList(this.group.address, 0, 0, 0)
  })

  describe("_accessListCount", async function () {
    it("should be 0 by default", async function () {
      const count = await this.contract.signatureMintCount(this.group.address)
      await expect(count).to.eq(0)
    })

    it("should increase after minting", async function () {
      const signature = sign(this.group, this.minter.address)
      await this.contract.connect(this.minter).signatureMint(signature, 1)

      const count = await this.contract.signatureMintCount(this.group.address)
      await expect(count).to.eq(1)
    })
  })
})
