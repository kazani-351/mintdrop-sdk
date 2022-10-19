import { useCounts } from "@mintdrop/sdk"
import Example from "../components/Example"

function UsePrices() {
  const counts = useCounts()

  const val = `
  {
    "maxSupply": ${counts.maxSupply},
    "totalSupply": ${counts.totalSupply},
    "remaining": ${counts.remaining}
  }
  `

  return (
    <Example>
      <pre>{val}</pre>
    </Example>
  )
}

export default UsePrices
