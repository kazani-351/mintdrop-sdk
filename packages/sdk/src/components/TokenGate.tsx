import React, { ReactNode } from "react"
import { useTokenGating } from "../hooks/useTokenGating"

type Props = {
  children: ReactNode
  wallet: `0x${string}`
  loading?: JSX.Element
  failure?: JSX.Element
}

export default function TokenGate({
  children,
  loading: loadingComponent = <p>Loading</p>,
  failure: failureComponent = <p>Not Allowed</p>,
  wallet
}: Props) {
  const { loading, allow } = useTokenGating(wallet)

  if (loading) {
    return loadingComponent as JSX.Element
  }

  if (allow) {
    return <div>{children}</div>
  }

  return failureComponent as JSX.Element
}
