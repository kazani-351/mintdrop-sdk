import Day from "dayjs"
import { BigNumber } from "ethers"
import { it, expect, describe } from "vitest"
import { getDeployData } from "../src/deployer"
import { formatArgs } from "../src/deployer/deploy"

describe("deployer", () => {
  describe("getDeployData", () => {
    it("should generate data", () => {
      const data = getDeployData({
        name: "Test Contract",
        symbol: "TEST",
        baseTokenURI: "https://meta.mintdrop.com/1234/",
        payouts: {
          "0x0000000000000000000000000000000000000000": 10000
        }
      })

      expect(data).toMatch(/0x.*/)
    })
  })

  describe("formatArgs", () => {
    it("should format payouts correctly", () => {
      const args = formatArgs({
        name: "Test Contract",
        symbol: "TEST",
        baseTokenURI: "https://meta.mintdrop.com/1234/",
        payouts: {
          "0x0000000000000000000000000000000000000000": 10000
        }
      })

      const [
        name,
        symbol,
        baseTokenURI,
        maxSupply,
        a,
        beneficiary,
        bips,
        auctionData,
        accessLists
      ] = args

      const [addresses, shares] = a as string[]
      const [mintPrice, startTime, endTime] = auctionData as number[]

      expect(name).to.eq("Test Contract")
      expect(symbol).to.eq("TEST")
      expect(baseTokenURI).to.eq("https://meta.mintdrop.com/1234/")
      expect(maxSupply).to.eq(0)
      expect(addresses).toEqual(["0x0000000000000000000000000000000000000000"])
      expect(shares).toEqual([10000])
      expect(beneficiary).to.eq("0x0000000000000000000000000000000000000000")
      expect(bips).to.eq(0)
      expect(mintPrice).to.eq(0)
      expect(startTime).to.eq(0)
      expect(endTime).to.eq(0)
      expect(accessLists).to.eql([])
    })

    describe("payouts", function () {
      it("split the shares", () => {
        const args = formatArgs({
          name: "Test Contract",
          symbol: "TEST",
          baseTokenURI: "https://meta.mintdrop.com/1234/",
          payouts: {
            "0x1234567890123456789012345678901234567890": 9500,
            "0xc0ffeec0ffeec0ffeec0ffeec0ffeec0ffee1234": 500
          }
        })

        const [addresses, shares] = args[4] as [string, string]

        expect(addresses).toEqual([
          "0x1234567890123456789012345678901234567890",
          "0xc0ffeec0ffeec0ffeec0ffeec0ffeec0ffee1234"
        ])

        expect(shares).toEqual([9500, 500])
      })

      it("should throw if the shares dont add up to 100", function () {
        const call = () =>
          formatArgs({
            name: "Test Contract",
            symbol: "TEST",
            baseTokenURI: "https://meta.mintdrop.com/1234/",
            payouts: {
              "0x1234567890123456789012345678901234567890": 10000,
              "0xc0ffeec0ffeec0ffeec0ffeec0ffeec0ffee1234": 100
            }
          })

        expect(call).toThrowError(/Shares do not add up to 100 percent/)
      })
    })

    describe("public minting", function () {
      describe("mintPrice", () => {
        it("should set the mint price", () => {
          const args = formatArgs({
            name: "Test Contract",
            symbol: "TEST",
            baseTokenURI: "https://meta.mintdrop.com/1234/",
            payouts: {
              "0x0000000000000000000000000000000000000000": 10000
            },
            mintPrice: 1.1234
          })

          const [mintPrice] = args[7] as [BigNumber]

          expect(mintPrice.toString()).toEqual("1123400000000000000")
        })
      })

      describe("startTime", () => {
        it("should default the start time to 0", () => {
          const args = formatArgs({
            name: "Test Contract",
            symbol: "TEST",
            baseTokenURI: "https://meta.mintdrop.com/1234/",
            payouts: {
              "0x0000000000000000000000000000000000000000": 10000
            }
          })

          const [_, startTime] = args[7] as [void, number]
          expect(startTime).toEqual(0)
        })

        it("should set the start time", () => {
          const time = Day()
          const args = formatArgs({
            name: "Test Contract",
            symbol: "TEST",
            baseTokenURI: "https://meta.mintdrop.com/1234/",
            payouts: {
              "0x0000000000000000000000000000000000000000": 10000
            },
            startTime: time.unix()
          })

          const [_, startTime] = args[7] as [void, number]

          expect(startTime).not.to.equal(0)
          expect(startTime).to.equal(time.unix())
        })
      })

      describe("endTime", () => {
        it("should default the start time to 0", () => {
          const args = formatArgs({
            name: "Test Contract",
            symbol: "TEST",
            baseTokenURI: "https://meta.mintdrop.com/1234/",
            payouts: {
              "0x0000000000000000000000000000000000000000": 10000
            }
          })

          const [_, _2, endTime] = args[7] as [void, void, number]
          expect(endTime).toEqual(0)
        })

        it("should set the start time", () => {
          const time = Day()
          const args = formatArgs({
            name: "Test Contract",
            symbol: "TEST",
            baseTokenURI: "https://meta.mintdrop.com/1234/",
            payouts: {
              "0x0000000000000000000000000000000000000000": 10000
            },
            endTime: time.unix()
          })

          const [_, _2, endTime] = args[7] as [void, void, number]

          expect(endTime).not.to.equal(0)
          expect(endTime).to.equal(time.unix())
        })
      })
    })
  })
})
