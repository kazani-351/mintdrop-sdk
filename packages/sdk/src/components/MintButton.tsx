import styles from "./MintButton.module.css"

import React from "react"
import { useCounts, useDrop, useMinting, useSignature } from "../hooks"
import classNames from "clsx"
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"
import { responsiveTextColor } from "../utils/colors"

import ConnectWalletButton from "./ConnectButton"

type Props = {
  className?: string
  style?: React.CSSProperties
  color: string
  text?: string
  textColor?: string
  onError?: (Error) => void
}

export default function MintButton(props: Props) {
  const {
    onError,
    color,
    text = "Mint Now",
    textColor,
    className,
    style
  } = props

  const { isConnected } = useAccount()
  const { chain: network } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const signature = useSignature()
  const counts = useCounts()
  const drop = useDrop()
  const { isMinting, isSuccess, canMint, signatureMint, publicMint } =
    useMinting()

  const backgroundColor = color
  const buttonTextColor = textColor || responsiveTextColor(backgroundColor)

  const handleGroupMint = ({ count }) => {
    signatureMint(count).catch((err) => {
      console.error(err)
      onError?.(err)
    })
  }

  const handlePublicMint = ({ count }) => {
    publicMint(count).catch((err) => {
      console.error(err)
      onError?.(err)
    })
  }

  if (isMinting) {
    return (
      <button
        disabled
        style={{ ...style, color: buttonTextColor, backgroundColor }}
        className={classNames(className, styles.MintButton, styles.disabled)}
      >
        Minting
        <span className="ml-1 dots" />
      </button>
    )
  }

  if (isSuccess) {
    return (
      <button
        disabled
        style={{ ...style, color: buttonTextColor, backgroundColor }}
        className={classNames(className, styles.MintButton, styles.disabled)}
      >
        Minted
      </button>
    )
  }

  if (!isConnected) {
    return <ConnectWalletButton themeColor={backgroundColor} />
  }

  if (!drop?.address) {
    return (
      <button
        disabled
        style={{ ...style, color: buttonTextColor, backgroundColor }}
        className={classNames(className, styles.MintButton, styles.disabled)}
      >
        Waiting on Deployment
      </button>
    )
  }

  if (drop && counts.remaining === 0) {
    return (
      <button
        disabled
        style={{
          ...style,
          color: buttonTextColor,
          backgroundColor,
          opacity: 0.5
        }}
        className={classNames(className, styles.MintButton, styles.disabled)}
      >
        Sold Out
      </button>
    )
  }

  if (network?.id !== drop?.chainId && switchNetwork) {
    return (
      <button
        onClick={() => switchNetwork(drop?.chainId)}
        className={classNames(className, styles.MintButton)}
        style={{ ...style, color: buttonTextColor, backgroundColor }}
      >
        Switch Network
      </button>
    )
  }

  // Minting Checks

  if (canMint) {
    if (signature?.valid) {
      return (
        <button
          style={{ ...style, color: buttonTextColor, backgroundColor }}
          onClick={() => handleGroupMint({ count: 1 })}
          className={classNames(className, styles.MintButton)}
        >
          {text}
        </button>
      )
    }

    // If they can't mint by signature, they can mint publicly
    return (
      <button
        style={{ ...style, color: buttonTextColor, backgroundColor }}
        className={classNames(className, styles.MintButton)}
        onClick={() => handlePublicMint({ count: 1 })}
      >
        {text}
      </button>
    )
  }

  return (
    <button
      disabled
      style={{
        ...style,
        color: buttonTextColor,
        backgroundColor,
        opacity: 0.5
      }}
      className={classNames(className, styles.MintButton, styles.disabled)}
    >
      Mint Not Started
    </button>
  )
}
