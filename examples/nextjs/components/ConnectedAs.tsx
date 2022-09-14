import { etherscanAddressURL } from "@mintdrop/sdk"
import clsx from "clsx"
import { useAccount, useDisconnect, useEnsName } from "wagmi"

export default function ConnectedAs(props: { className?: string }) {
  const { className } = props
  const { address } = useAccount()
  const { data: ens } = useEnsName()
  const { disconnect } = useDisconnect()

  return (
    <p
      className={clsx(
        className,
        "text-sm text-center flex space-x-3 items-center justify-center text-gray"
      )}
    >
      <span className="flex items-center mt-2 space-x-2">
        <span suppressHydrationWarning>
          connected as{" "}
          <a
            href={etherscanAddressURL(address)}
            className="underline cursor-pointer"
            target="_blank"
            rel="noreferrer"
            suppressHydrationWarning
          >
            {ens || (address && address?.slice(0, 8))}
          </a>
        </span>
        <button
          onClick={() => disconnect()}
          className="px-3 py-1.5 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          Disconnect
        </button>
      </span>
    </p>
  )
}
