import { ethToWei } from "@mintdrop/sdk"
import { expect } from "chai"
import { ethers } from "hardhat"

import { deployMintdrop } from "../helpers"

describe("Mintdrop", function () {
  describe("setMintingConfig", () => {
    beforeEach(async function () {
      const [deployer, group, minter, other] = await ethers.getSigners()
      this.deployer = deployer
      this.group = group
      this.minter = minter
      this.other = other

      this.contract = await deployMintdrop()
    })

    it("should be able to be set", async function () {
      expect((await this.contract.mintConfig()).mintPrice).to.eq(0)
      await this.contract.setPublicMinting([ethToWei(0.1), 0, 0])
      expect((await this.contract.mintConfig()).mintPrice).to.eq(ethToWei(0.1))
    })

    it("should be revert when called by non owner", async function () {
      const mintPromise = this.contract
        .connect(this.minter)
        .setPublicMinting([ethToWei(0.1), 0, 0])
      await expect(mintPromise).to.be.reverted
    })
  })
})
