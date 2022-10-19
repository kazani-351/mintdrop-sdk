import { wagmi, useTokenGating } from "@mintdrop/sdk"
import { SafeHydrate } from "next-tools"

function UseTokenGating() {
  const { address } = wagmi.useAccount()
  const { allow } = useTokenGating(address)

  return (
    <SafeHydrate>
      Current Wallet: {address}
      <br />
      Allow Access: {JSON.stringify(allow)}
    </SafeHydrate>
  )
}

export default UseTokenGating
