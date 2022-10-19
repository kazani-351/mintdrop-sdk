import { it, describe } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { usePrices } from "../../src/index"
import "@testing-library/jest-dom"

import nock from "nock"
import * as mocks from "../mockData"

describe("hooks", () => {
  describe("usePrices", () => {
    it("properly fetches price rates from Coinbase API in USD by default", async () => {
      nock("https://api.coinbase.com")
        .get(`/v2/exchange-rates?currency=USD`)
        .reply(200, mocks.cbUSD)

      nock("https://api.coinbase.com")
        .get(`/v2/exchange-rates?currency=EUR`)
        .reply(200, mocks.cbEUR)

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
  })
})
