import React from "react"
import Day from "dayjs"
import { useDrop, useTiming } from "../hooks"
import classNames, { clsx } from "clsx"
import { countdown } from "../utils/formatting"

import styles from "./MintWidget.module.css"

// import useToast from "../hooks/useToast"
import ConnectedAs from "./ConnectedAs"
import MintButton from "./MintButton"

type Props = {
  className?: string
  color?: string
}

export default function MintWidget(props: Props) {
  const { className, color } = props
  const drop = useDrop()

  return (
    <div
      className={clsx(className, styles.MintWidget)}
      style={{
        width: 350,
        borderColor: color || "#53DDB4"
      }}
    >
      <p className={styles.MintWidgetTitle}>Minting Schedule</p>

      <div className={styles.MintWidgetGroups}>
        {drop?.groups.map((group, i) => (
          <Group
            key={group.name}
            name={group.name}
            time={group.startTime}
            last={!drop.startTime && drop.groups.length - 1 === i}
          />
        ))}
        {drop?.startTime ? (
          <Group name="Public Minting" time={drop.startTime} last />
        ) : null}
      </div>

      <div className={styles.MintWidgetActions}>
        <MintButton
          color={color as string}
          className={styles.MintWidgetButton}
        />
        <ConnectedAs />
      </div>
      {/* <PoweredBy className="w-auto mt-5" /> */}
    </div>
  )
}

type GroupProps = {
  name: string
  time: number
  last?: boolean
}

function Group(props: GroupProps) {
  const { name, time, last } = props
  const { complete: live } = useTiming(Day.unix(time).toDate())

  return (
    <div className={styles.MintGroup}>
      {!last && (
        <div className={styles.MintGroupBorder}>
          <span className={styles.MintGroupBorderInner} aria-hidden="true" />
        </div>
      )}
      <div className={styles.MintGroupRow}>
        <div className={styles.MintGroupRowLeft}>
          <span
            className={classNames(
              styles.MintGroupBadge,
              live ? styles.MintGroupBadgeLive : styles.MintGroupBadgeSoon
            )}
          >
            {live ? "LIVE" : "SOON"}
          </span>
        </div>
        <div className={styles.MintGroupContent}>
          <p className={styles.MintGroupTitle}>{name}</p>
          <p className={styles.MintGroupCountdown}>
            {countdown(time, "Minting is live!")}
          </p>
        </div>
      </div>
    </div>
  )
}
