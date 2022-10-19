import { it, describe } from "vitest"
import { waitFor } from "@testing-library/react"
import { useCounts } from "../../src/index"
import "@testing-library/jest-dom"
import { wrapHook } from "../wrapper"

describe("hooks", () => {
  describe("useCounts", () => {
    it("it should return the NFT supply stats", async () => {
      const result = await wrapHook<ReturnType<typeof useCounts>>(() =>
        useCounts()
      )

      await waitFor(() => expect(result.current.maxSupply).toBeDefined())

      expect(result.current).toEqual({
        maxSupply: Infinity,
        totalSupply: 0,
        remaining: Infinity
      })
    })

    // TODO: test for supply that is not 0
  })
})
