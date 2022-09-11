import { it, expect, describe } from "vitest"
import { percentToBips, bipsToPercent, weiToEth, ethToWei } from "../src/sdk"

describe("basisPoints", () => {
  describe("percentToBips", () => {
    it("converts percent to bips", () => {
      expect(percentToBips(0.25)).toBe(25)
    })
  })

  describe("bipsToPercent", () => {
    it('returns "null" string', () => {
      expect(bipsToPercent("string")).toBe(null)
    })
    it("converts bips to percent", () => {
      expect(bipsToPercent(10_000)).toBe(100)
    })
  })
})

describe("conversion", () => {
  describe("weiToEth", () => {
    it("should convert wei to eth", () => {
      expect(weiToEth(10 ** 18)).toBe(1)
    })
  })
  describe("ethToWei", () => {
    it("should convert eth to wei", () => {
      expect(ethToWei(1)?.toBigInt()).toBe(BigInt(10 ** 18))
    })
  })
})
