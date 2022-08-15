import classNames from "classnames"
import truncateEthAddress from "truncate-eth-address"
import { useAccount, useDisconnect, useEnsName } from "wagmi"

export default function ConnectedAs(props: { className?: string }) {
  const { className } = props
  const { address, isConnected } = useAccount()
  const { data: ens } = useEnsName()
  const { disconnectAsync } = useDisconnect()

  if (!isConnected) return null

  return (
    <p
      className={classNames(
        className,
        "text-center flex space-x-[8px] items-center justify-center"
      )}
    >
      <span className="text-[12px] text-[#B5BCB3]">
        {ens || truncateEthAddress(address as string)} connected
      </span>
      <a
        className="text-[12px] leading-[20px] text-purple-500 font-[600] cursor-pointer hover:underline"
        onClick={() => disconnectAsync()}
      >
        Disconnect
      </a>
    </p>
  )
}
