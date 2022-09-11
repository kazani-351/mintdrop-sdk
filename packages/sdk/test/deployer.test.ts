import { it, expect, describe } from "vitest"
import { getDeployData } from "../src/deployer"

describe("deployer", () => {
  describe("getDeployData", () => {
    it("should ", () => {
      const data = getDeployData({
        name: "Test Contract",
        symbol: "TEST"
      })

      expect(data).toMatch(/0x.*/)
    })
  })
})
