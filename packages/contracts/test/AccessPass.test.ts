import { ethers } from "hardhat"

import { deployContract } from "./helpers"

// const RECEIVER_MAGIC_VALUE = "0x150b7a02"
// const GAS_MAGIC_VALUE = 20000

describe("Single", () => {
  beforeEach(async function () {
    const [owner, addr1, addr2] = await ethers.getSigners()
    this.owner = owner
    this.addr1 = addr1
    this.addr2 = addr2

    this.contract = await deployContract("AccessPass", [
      "Test NFT",
      "NFT",
      10_000,
      ethers.utils.parseUnits("0.25", "ether")
    ])

    // this.receiver = await deployContract("ERC721ReceiverMock", [
    //   RECEIVER_MAGIC_VALUE
    // ])
    // this.startTokenId = this.contract.startTokenId
    //   ? (await this.contract.startTokenId()).toNumber()
    //   : 0
  })
})
