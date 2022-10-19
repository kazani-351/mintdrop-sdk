import { it, describe } from "vitest"
import "@testing-library/jest-dom"
import { wrapHook } from "../wrapper"
import { useTokenGating } from "../../src/hooks/useTokenGating"
import nock from "nock"
import { waitFor } from "@testing-library/react"
import { DROP_ID } from "../mockData"

function mockResponse(wallet: string, owner: boolean) {
  nock("http://localhost:4000")
    .get(`/drops/${DROP_ID}/gate/${wallet}`)
    .reply(200, {
      wallet,
      owner
    })
}

describe("hooks", () => {
  describe("useTokenGating", () => {
    it("should work for owner = true", async () => {
      // IH test account
      const wallet = "0xE0215419ACEc1D54a588864FAc410b28618333B9"
      mockResponse(wallet, true)

      const result = await wrapHook<ReturnType<typeof useTokenGating>>(() =>
        useTokenGating(wallet)
      )

      await waitFor(() => expect(result.current.loading).toBe(false))

      expect(result.current.allow).toBe(true)
      expect(result.current.deny).toBe(false)
    })

    it("should work for owner = false", async () => {
      const wallet = "0x1234567890123456789012345678901234567890"
      mockResponse(wallet, false)

      const result = await wrapHook<ReturnType<typeof useTokenGating>>(() =>
        useTokenGating(wallet)
      )

      await waitFor(() => expect(result.current.loading).toBe(false))

      expect(result.current.allow).toBe(false)
      expect(result.current.deny).toBe(true)
    })
  })
})
