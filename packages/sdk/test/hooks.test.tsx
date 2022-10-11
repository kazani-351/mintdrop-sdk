import React, { ReactNode } from "react"
import { it, describe, vi } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import {
  MintdropProvider,
  useBlockBeat,
  useContract,
  useCounts,
  useDrop,
  useEstimation,
  usePrices,
  useSignature,
  useTiming
} from "../src/sdk"
import { WagmiConfig } from "wagmi"
import "@testing-library/jest-dom"
import { actConnect, actDisconnect, setupClient, useWagmi } from "./utils"
import { Contract, ethers } from "ethers"

import * as mocks from "./mockData"
import dayjs from "dayjs"
import "vi-fetch/setup"
import { mockGet } from "vi-fetch"

const client = setupClient({})

const DROP_ID = "cl81yyumd9047500wmc8q06sl12"

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <MintdropProvider drop={DROP_ID}>
      <WagmiConfig client={client}>{children}</WagmiConfig>
    </MintdropProvider>
  )
}

mockGet(`https://api.mintdrop.xyz/drops/${DROP_ID}`).willResolve(mocks.drop)

mockGet("https://api.coinbase.com/v2/exchange-rates?currency=USD").willResolve(
  mocks.cbUSD
)

mockGet("https://api.coinbase.com/v2/exchange-rates?currency=EUR").willResolve(
  mocks.cbEUR
)

describe("hooks", () => {
  describe("useBlockBeat", () => {
    it("returns the current block", async () => {
      const utils = renderHook(() => useWagmi(), {
        wrapper
      })
      await actConnect({ utils })

      // wait to connect
      await waitFor(() =>
        expect(utils.result.current.account.isConnected).toBeTruthy()
      )
      const { result } = renderHook(() => useBlockBeat(true))

      // wait to fetch the block
      await waitFor(() => expect(result.current).toBeDefined())

      expect(typeof result.current).toBe("number")

      await actDisconnect({ utils })
    })
  })
  describe("useEstimation", () => {
    it("estimates transaction costs", async () => {
      const utils = renderHook(() => useWagmi(), {
        wrapper
      })
      await actConnect({ utils })

      // wait to connect
      await waitFor(() =>
        expect(utils.result.current.account.isConnected).toBeTruthy()
      )

      const { result } = renderHook(() =>
        useEstimation(ethers.utils.formatBytes32String("Hello World"))
      )

      await waitFor(() => expect(result.current.gas).toBeTruthy())

      expect(typeof result.current.gas).toBe("number")
      expect(typeof result.current.gasPrice).toBe("number")
      expect(typeof result.current.wei).toBe("number")
      expect(typeof result.current.eth).toBe("number")

      await actDisconnect({ utils })
    })
    it("supports empty strings (no data)", async () => {
      const utils = renderHook(() => useWagmi(), {
        wrapper
      })
      await actConnect({ utils })

      // wait to connect
      await waitFor(() =>
        expect(utils.result.current.account.isConnected).toBeTruthy()
      )

      const { result } = renderHook(() =>
        useEstimation(
          "0x0000000000000000000000000000000000000000000000000000000000000000"
        )
      )

      await waitFor(() => expect(result.current.gas).toBeTruthy())

      expect(typeof result.current.gas).toBe("number")
      expect(typeof result.current.gasPrice).toBe("number")
      expect(typeof result.current.wei).toBe("number")
      expect(typeof result.current.eth).toBe("number")

      await actDisconnect({ utils })
    })
  })
  describe("useDrop", () => {
    it("returns drop instance", async () => {
      const { result } = renderHook(() => useDrop(), { wrapper })

      await waitFor(() => expect(result.current).toBeDefined())

      expect(result.current).toStrictEqual(mocks.drop)
    })
  })
  describe("useContract", () => {
    it("initializes Mintdrop contract", async () => {
      const utils = renderHook(() => useWagmi(), {
        wrapper
      })
      await actConnect({ utils })

      // wait to connect
      await waitFor(() =>
        expect(utils.result.current.account.isConnected).toBeTruthy()
      )
      const { result } = renderHook(() => useContract(), { wrapper })

      await waitFor(() => expect(result.current).toBeTruthy())

      expect(result.current instanceof Contract).toBe(true)

      await actDisconnect({ utils })
    })
  })
  describe("useCounts", () => {
    it("it should return the NFT supply stats", async () => {
      const utils = renderHook(() => useWagmi(), {
        wrapper
      })
      await actConnect({ utils })

      // wait to connect
      await waitFor(() =>
        expect(utils.result.current.account.isConnected).toBeTruthy()
      )

      const { result } = renderHook(() => useCounts(), { wrapper })

      await waitFor(() => expect(result.current.maxSupply).toBeDefined())

      expect(result.current).toEqual({
        maxSupply: 0,
        totalSupply: 0,
        remaining: 0
      })

      await actDisconnect({ utils })
    })
    // TODO: test for supply that is not 0
  })
  describe("useTiming", () => {
    it("should be uncompleted by default", async () => {
      const when = dayjs()
        .add(dayjs.duration({ seconds: 5 }))
        .toDate()

      const { result } = renderHook(() => useTiming(when), { wrapper })

      await waitFor(() => expect(result.current.now).toBeDefined())

      expect(result.current.complete).toBe(false)
      expect(result.current.diff.seconds()).toBe(5)
    })
    // doesn't work for some reason
    it.skip("should complete on timeout", async () => {
      vi.useFakeTimers()
      const when = dayjs()
        .add(dayjs.duration({ seconds: 1 }))
        .toDate()

      const { result } = renderHook(() => useTiming(when), { wrapper })

      await waitFor(() => expect(result.current.now).toBeDefined())

      vi.advanceTimersByTime(1000)

      await waitFor(() => expect(result.current.complete).toBe(true))

      console.log("here")

      vi.useRealTimers()
    })
  })
  describe.skip("useSignature", () => {
    it("should create a mint signature", async () => {
      const utils = renderHook(() => useWagmi(), {
        wrapper
      })
      await actConnect({ utils })

      // wait to connect
      await waitFor(() =>
        expect(utils.result.current.account.isConnected).toBeTruthy()
      )

      const { result } = renderHook(() => useSignature(), { wrapper })

      await waitFor(() => expect(result.current).toBeTruthy())

      console.log(result.current)

      await actDisconnect({ utils })
    })
  })
  describe("usePrices", () => {
    it("properly fetches price rates from Coinbase API in USD by default", async () => {
      const { result } = renderHook(() => usePrices())

      await waitFor(() => expect(result.current.prices).toBeDefined())

      const { rates } = mocks.cbUSD.data

      const prices = Object.fromEntries(
        Object.entries(rates).map(([key, val]: [string, string]) => [
          key,
          1 / parseFloat(val)
        ])
      )

      expect(result.current.prices).toEqual(prices)
    })
    it("supports fetching any currency rate", async () => {
      const { result } = renderHook(() => usePrices({ currency: "EUR" }))

      await waitFor(() => expect(result.current.prices).toBeDefined())

      const { rates } = mocks.cbEUR.data

      const prices = Object.fromEntries(
        Object.entries(rates).map(([key, val]: [string, string]) => [
          key,
          1 / parseFloat(val)
        ])
      )

      expect(result.current.prices).toEqual(prices)
    })
  })
})
