import { it, describe } from "vitest"
import { waitFor } from "@testing-library/react"
import { useDrop } from "../../src/index"
import "@testing-library/jest-dom"

// import { Contract } from "ethers"
import { wrapHook } from "../wrapper"
import { DROP_ID } from "../mockData"

describe("hooks", () => {
  describe("useDrop", () => {
    it("initializes Mintdrop contract", async () => {
      const result = await wrapHook<ReturnType<typeof useDrop>>(() => useDrop())
      await waitFor(() => expect(result.current?.id).toBeDefined())

      // expect(result.current.contract instanceof Contract).toBe(true)
      expect(result.current.id).toEqual(DROP_ID)
    })
  })
})
