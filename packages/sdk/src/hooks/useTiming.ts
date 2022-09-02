import Day from "dayjs"
import duration from "dayjs/plugin/duration"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import { useEffect, useState } from "react"

Day.extend(duration)
Day.extend(isSameOrAfter)

export function useTiming(time: Date, opts = { interval: 1000 }) {
  const [now, setNow] = useState<Day.Dayjs>(Day())
  const { interval = 1000 } = opts

  const complete = now.isSameOrAfter(time)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Day()
      setNow(now)
      if (now.isSameOrAfter(time)) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [time, setNow, interval])

  const diff = Day.duration((Day(time).unix() - now.unix()) * 1000)

  return {
    now,
    diff,
    complete
  }
}
