import classNames from "classnames"
import moment, { Moment } from "moment"

import useHeartBeat from "../hooks/useHeartBeat"

type GroupProps = {
  live: boolean
  name: string
  time: Moment
  last?: boolean
}

export default function Group(props: GroupProps) {
  const { name, time, last } = props
  useHeartBeat(100, time)
  const live = moment().isSameOrAfter(time)

  return (
    <div className="relative">
      <span
        className={classNames(
          "absolute -top-1 left-0 text-center font-bold text-[0.6em] uppercase py-1 rounded-full border-y-2 border-black mt-0.5",
          live
            ? "px-2.5 bg-green text-black dark:text-black"
            : "px-1.5 bg-black-400 text-gray dark:text-gray"
        )}
      >
        {live ? "LIVE" : "SOON"}
      </span>
      <div
        className={classNames(
          "pl-8 ml-5 text-sm pb-5",
          "border-l-2",
          last ? "border-black" : live ? "border-green" : "border-black-400"
        )}
      >
        <p className="relative font-serif text-lg font-bold text-white dark:text-white -top-1">
          {name}
        </p>

        <p className="text-gray-500">{countdown(time, "Minting is live!")}</p>
      </div>
    </div>
  )
}

function countdown(time, after) {
  if (moment().isSameOrAfter(time)) return after

  const now = moment()
  const diff = moment.duration(moment(time).diff(now))

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
