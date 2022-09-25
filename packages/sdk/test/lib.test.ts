/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ethers } from "ethers"
import { it, expect, describe } from "vitest"
import {
  etherscanAddressURL,
  etherscanHost,
  etherscanTxURL,
  hash,
  hashBin,
  recoverAddress,
  sign
} from "../src/sdk"

const VANITY_ADDRESS = process.env.VANITY_ADDRESS!
const VANITY_PK = process.env.VANITY_PK!

describe("lib", () => {
  describe("etherscan", () => {
    it("etherscanHost should return proper hosts", () => {
      const hosts: string[] = []
      for (const chainId of [1, 3, 4, 5, 137, 80001] as const) {
        hosts.push(etherscanHost(chainId))
      }
      expect(hosts).toEqual([
        `https://etherscan.io`,
        `https://ropsten.etherscan.io`,
        `https://rinkeby.etherscan.io`,
        `https://goerli.etherscan.io`,
        `https://polygonscan.com`,
        `https://mumbai.polygonscan.com`
      ])
    })
    it("etherscanAddressURL generates an address URL", () => {
      expect(etherscanAddressURL("vitalik.eth", 1)).toBe(
        "https://etherscan.io/address/vitalik.eth"
      )
    })
    it("etherscanTxURL generates a tx URL", () => {
      expect(
        etherscanTxURL(
          "0xdbd59729237fb4fb1fa132e94f010197a84a560529a2db2293fb78c7f1ef1e0f",
          1
        )
      ).toBe(
        "https://etherscan.io/tx/0xdbd59729237fb4fb1fa132e94f010197a84a560529a2db2293fb78c7f1ef1e0f"
      )
    })
  })
  describe("signing", () => {
    it("hash should pack address and nonce and return keccak256 hash", () => {
      expect(hash(VANITY_ADDRESS)).toBe(
        "0x5869d5647f7eed5e8a8fcdb5d7e14468549195cdca31c91a54afebf5a6fcadfe"
      )
    })
    it("should convert keccak256 hash to uint array", () => {
      expect(hashBin(VANITY_ADDRESS)).toEqual(
        new Uint8Array([
          88, 105, 213, 100, 127, 126, 237, 94, 138, 143, 205, 181, 215, 225,
          68, 104, 84, 145, 149, 205, 202, 49, 201, 26, 84, 175, 235, 245, 166,
          252, 173, 254
        ])
      )
    })
    it("should sign the message", async () => {
      const signer = new ethers.Wallet(VANITY_PK) // vanity private key
      expect(await sign(signer, VANITY_ADDRESS)).toBe(
        "0x9f60fd3e254118ce5fd9dd3d12af4aa30a3fc06e3593c8acda16e4b11413ee38433bce825ac3b06fefebaf383a84f4d40a210cc01f6d41da1b34edb31b5c861d1b"
      )
    })
    it("should recover address from the message", async () => {
      expect(
        recoverAddress(
          VANITY_ADDRESS,
          "0x9f60fd3e254118ce5fd9dd3d12af4aa30a3fc06e3593c8acda16e4b11413ee38433bce825ac3b06fefebaf383a84f4d40a210cc01f6d41da1b34edb31b5c861d1b"
        )
      ).toBe(VANITY_ADDRESS)
    })
  })
})
