import styles from "./ConnectedAs.module.css"

import { etherscanAddressURL } from "../lib/etherscan"
import classNames from "classnames"
import { useAccount, useEnsName } from "wagmi"
import { truncateEthAddress } from "../utils/formatting"

export default function ConnectedAs(props: { className?: string }) {
  const { className } = props
  const { address, isConnected } = useAccount()
  const { data: ens } = useEnsName()

  if (!isConnected) return null

  return (
    <p className={classNames(className, styles.ConnectedAs)}>
      <span>connected as </span>
      <a
        href={etherscanAddressURL(address)}
        className={classNames("cursor-pointer hover:underline")}
        target="_blank"
        rel="noreferrer"
      >
        {address && (ens || truncateEthAddress(address as string))}
      </a>
    </p>
  )
}
