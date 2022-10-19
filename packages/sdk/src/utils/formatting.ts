import Day from "dayjs"

export function truncateEthAddress(address: string | undefined) {
  if (!address) return null
  return address.slice(0, 6) + "…" + address.slice(38, 42)
}

/**
 * @note - IH - 20220831
 * It would probably be cleaner to just send the now and diff fields from <Group> to here.
 * another option would be to just ditch this and move this formatter into the useTiming() hook
 */
export function countdown(time, after) {
  const now = Day().unix()
  if (now > time) return after

  // time in in unix (seconds) but diff wants ms
  const diff = Day.duration((time - now) * 1000)

  const days = diff.get("days")
  const hours = diff.get("hours")
  const minutes = diff.get("minutes")
  const seconds = diff.get("seconds")

  const list = []
  if (days > 0) list.push(`${days} days`)
  if (days === 0 && hours > 0) list.push(`${hours} hrs`)
  list.push(`${minutes} mins`)
  if (days < 1) list.push(`${seconds} secs`)

  return list.join(" : ")
}
