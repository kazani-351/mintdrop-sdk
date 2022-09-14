import { useConnect } from "wagmi"

const ConnectWalletButton = () => {
  const { connect, connectors } = useConnect()
  const connector = connectors[0]

  return (
    <button
      className="block w-full p-3 text-sm font-semibold text-white uppercase bg-yellow-500 rounded-full hover:bg-yellow-600"
      onClick={() => connect({ connector })}
    >
      Connect Wallet
    </button>
  )
}

export default ConnectWalletButton
