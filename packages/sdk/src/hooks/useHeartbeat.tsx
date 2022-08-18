import moment from "moment"
import { useEffect, useState } from "react"

export default function useHeartBeat(ms, until = null) {
  const [tick, setTick] = useState()

  useEffect(() => {
    const timeout = setInterval(() => {
      setTick(new Date().getMilliseconds())
      if (until && moment().isAfter(until)) clearTimeout(timeout)
    }, ms)
    return () => clearTimeout(timeout)
  }, [ms, until])

  return tick
}
