import { useAccount, useDisconnect } from "wagmi"

export default function Debug() {
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div className="fixed bottom-0 left-0 flex w-screen p-2 space-x-5 bg-green-50">
      <span>Mintdrop Debug</span>
      {isConnected && (
        <button className="underline" onClick={() => disconnect()}>
          Disconnect Wallet
        </button>
      )}
    </div>
  )
}
