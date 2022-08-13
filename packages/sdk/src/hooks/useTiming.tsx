import { useCallback, useEffect, useState } from "react"
import moment, { Moment, unitOfTime } from "moment"

export function useTiming(time: Moment, opts = { interval: 1000 }) {
  const [now, setNow] = useState(moment())
  const { interval = 1000 } = opts

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(moment())
    }, interval)
    return () => clearInterval(timer)
  }, [setNow, interval])

  const diff = useCallback((unit: unitOfTime.Diff = "minute") => {
    return time.diff(now, unit)
  })

  return {
    now,
    diff,
    complete: moment() > time
  }
}
