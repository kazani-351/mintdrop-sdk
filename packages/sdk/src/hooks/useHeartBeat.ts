import { useEffect, useState } from "react"
import Day from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"

Day.extend(isSameOrAfter)

export function useHeartBeat(ms: number, until = null) {
  const [tick, setTick] = useState<number>()
  useEffect(() => {
    const timeout = setInterval(() => {
      setTick(new Date().getMilliseconds())
      if (until && Day().isAfter(until)) clearTimeout(timeout)
    }, ms)
    return () => clearTimeout(timeout)
  }, [ms, until])

  return tick
}
