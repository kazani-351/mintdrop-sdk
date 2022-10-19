import { recoverAddress, sign } from "@mintdrop/sdk"
import { ethers } from "hardhat"
import * as assert from "node:assert/strict"
import { deployContract } from "../../helpers"

describe("signatures", () => {
  beforeEach(async function () {
    const [owner, addr1, addr2] = await ethers.getSigners()
    this.owner = owner
    this.addr1 = addr1
    this.addr2 = addr2

    this.contract = await deployContract("SignersMock")
  })

  it("should recover via ethers", async function () {
    const message = this.owner.address
    const signature = await sign(this.owner, message)
    const verified = recoverAddress(message, signature)

    assert.equal(verified, message)
  })

  it("should recover via contract", async function () {
    const msg = this.addr1.address
    const signature = await sign(this.owner, msg)

    const contractRecover = await this.contract
      .connect(this.addr1)
      .check(signature)

    assert.equal(contractRecover, this.owner.address)
  })
})
