import { MintWidget } from "@mintdrop/sdk"
import { SafeHydrate } from "next-tools"

const Example = ({ color = "#53DDB4" }) => {
  return (
    <SafeHydrate>
      <MintWidget color={color} />
    </SafeHydrate>
  )
}

export default Example
