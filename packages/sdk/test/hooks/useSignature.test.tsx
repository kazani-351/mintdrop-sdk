import { it, describe } from "vitest"
import { waitFor } from "@testing-library/react"
import { useSignature } from "../../src/index"
import { wrapHook } from "../wrapper"

describe("hooks", () => {
  describe.skip("useSignature", () => {
    it("should create a mint signature", async () => {
      const result = await wrapHook<ReturnType<typeof useSignature>>(() =>
        useSignature()
      )

      await waitFor(() => expect(result.current).toBeTruthy())
    })
  })
})
