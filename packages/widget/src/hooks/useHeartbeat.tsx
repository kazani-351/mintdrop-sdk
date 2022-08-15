import moment from "moment"
import { useEffect, useState } from "react"

export default function useHeartbeat(ms, until = null) {
  const [tick, setTick] = useState<number>()

  useEffect(() => {
    const timeout = setInterval(() => {
      setTick(new Date().getMilliseconds())
      if (until && moment().isAfter(until)) clearTimeout(timeout)
    }, 500)
    return () => clearTimeout(timeout)
  }, [until])

  return tick
}
