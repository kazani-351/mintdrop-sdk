import { useCounts, useDrop, useMinting, useSignature } from "@mintdrop/sdk"
import React from "react"
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"

import ConnectWalletButton from "./ConnectWalletButton"

export default function MintButton(props: any) {
  const { minting, success, onPublicMint, onGroupMint } = props

  const { isConnected } = useAccount()
  const { chain: network } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const drop = useDrop()
  const signature = useSignature()
  const counts = useCounts()
  const { canMint } = useMinting()

  if (!drop) return null
  const { address: contractAddress, chainId } = drop

  if (minting) {
    return (
      <button
        disabled
        className="block w-full p-3 text-sm font-semibold text-white uppercase bg-blue-500 rounded-full opacity-50"
      >
        Minting
        <span className="ml-1 dots" />
      </button>
    )
  }

  if (success) {
    return (
      <button
        disabled
        className="block w-full p-3 text-sm font-semibold text-white uppercase bg-green-500 rounded-full"
      >
        Minted
      </button>
    )
  }

  if (!isConnected) {
    return <ConnectWalletButton />
  }

  if (!contractAddress) {
    return (
      <button
        disabled
        className="block w-full p-3 text-sm font-semibold text-white uppercase rounded-full opacity-50 bg-blue"
      >
        Waiting on Deployment
      </button>
    )
  }

  if (counts.remaining === 0) {
    return (
      <button
        disabled
        className="block w-full p-3 text-sm font-semibold uppercase rounded-full bg-black-400 text-gray"
      >
        Sold Out
      </button>
    )
  }

  if (network?.id !== chainId && switchNetwork) {
    return (
      <button
        className="block w-full p-3 text-sm font-semibold text-white uppercase bg-yellow-500 rounded-full hover:bg-yellow-600"
        onClick={() => switchNetwork(chainId)}
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
          className="block w-full p-3 text-sm font-semibold text-white uppercase bg-blue-500 rounded-full hover:bg-blue-600"
          onClick={() => onGroupMint()}
        >
          Mint Now
        </button>
      )
    }

    // If they can't mint by signature, they can mint publicly
    return (
      <button
        className="block w-full p-3 text-sm font-semibold text-white uppercase bg-blue-500 rounded-full hover:bg-blue-600"
        onClick={() => onPublicMint()}
      >
        Mint Now
      </button>
    )
  }

  return (
    <button
      disabled
      className="block w-full p-3 text-sm font-semibold text-white uppercase bg-black rounded-full opacity-50"
    >
      Mint Not Started
    </button>
  )
}
