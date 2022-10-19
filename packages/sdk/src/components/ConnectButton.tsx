import React from "react"
import { useConnect } from "wagmi"

const ConnectWalletButton = ({ themeColor }) => {
  const { connect, connectors } = useConnect()
  const connector = connectors[0]

  return (
    <button
      className="items-center justify-center block w-full p-3 space-x-2 text-sm font-semibold text-white uppercase rounded-full"
      style={{ backgroundColor: themeColor || "#53DDB4" }}
      onClick={() => connect({ connector })}
    >
      <span>Connect Wallet</span>
    </button>
  )
}

export default ConnectWalletButton
