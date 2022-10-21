import React from "react"
import clsx from "clsx"
import { useConnect } from "wagmi"
import { responsiveTextColor } from "../utils/colors"

import styles from "./ConnectButton.module.css"

type Props = {
  className?: string
  style?: React.CSSProperties
  color: string
  text?: string
  textColor?: string
}

const ConnectWalletButton = (props: Props) => {
  const { className, color, textColor, text = "Connect Wallet", style } = props
  const { connect, connectors } = useConnect()
  const connector = connectors[0]

  const backgroundColor = color
  const buttonTextColor = textColor || responsiveTextColor(backgroundColor)

  return (
    <button
      className={clsx(className, styles.ConnectWalletButton)}
      style={{ ...style, color: buttonTextColor, backgroundColor }}
      onClick={() => connect({ connector })}
    >
      {text}
    </button>
  )
}

export default ConnectWalletButton
