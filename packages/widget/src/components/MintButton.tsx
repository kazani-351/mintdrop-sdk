import moment from "moment"
import React from "react"
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi"

import useHeartBeat from "../hooks/useHeartBeat"

export default function MintButton(props) {
  const { chainId, time, onPublicMint, isMinting, isSuccess } = props

  const { isConnected } = useAccount()
  const { chain: network } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  useHeartBeat(100, time)

  const isLive = moment().isSameOrAfter(time)

  if (isMinting) {
    return (
      <button
        disabled
        className="block w-full p-3 text-sm font-semibold text-white uppercase rounded-lg opacity-50 bg-blue"
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
        className="block w-full p-3 text-sm font-semibold text-black uppercase rounded-lg bg-green"
      >
        Minted
      </button>
    )
  }

  if (!isConnected) {
    return <ConnectWalletButton />
  }

  if (network?.id !== chainId && switchNetwork) {
    return (
      <button
        className="block w-full p-3 text-sm font-semibold text-white uppercase bg-red-500 rounded-lg hover:bg-red-600"
        onClick={() => switchNetwork(chainId)}
      >
        Switch Network
      </button>
    )
  }

  if (isLive) {
    return (
      <button
        className="block w-full p-3 text-sm font-semibold text-white uppercase rounded-lg bg-blue hover:bg-blue-600"
        onClick={onPublicMint}
      >
        Mint Now
      </button>
    )
  }

  return (
    <button
      disabled
      className="block w-full p-3 text-sm font-semibold uppercase rounded-lg bg-black-400 text-gray"
    >
      Mint Starting Soon
    </button>
  )
}

const ConnectWalletButton = () => {
  const { connect, connectors } = useConnect()
  const connector = connectors[0]

  return (
    <button
      className="block w-full p-3 text-sm font-semibold text-white uppercase bg-red-500 rounded-lg hover:bg-red-600"
      onClick={() => connect({ connector })}
    >
      Connect Wallet
    </button>
  )
}
