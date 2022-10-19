import { it, describe, vi } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { useTiming } from "../../src/index"

import dayjs from "dayjs"

describe("hooks", () => {
  describe("useTiming", () => {
    it("should be uncompleted by default", async () => {
      const when = dayjs()
        .add(dayjs.duration({ seconds: 5 }))
        .toDate()

      const { result } = renderHook(() => useTiming(when))

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

      const { result } = renderHook(() => useTiming(when))

      await waitFor(() => expect(result.current.now).toBeDefined())

      vi.advanceTimersByTime(1000)

      await waitFor(() => expect(result.current.complete).toBe(true))

      vi.useRealTimers()
    })
  })
})
