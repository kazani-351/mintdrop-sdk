import Day from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import { useEffect, useState } from "react"

Day.extend(isSameOrAfter)

export function useHeartBeat(ms, until = null) {
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
