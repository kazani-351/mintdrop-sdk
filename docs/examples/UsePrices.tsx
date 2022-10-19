import { usePrices } from "@mintdrop/sdk"

function UsePrices() {
  const prices = usePrices()

  return <pre>{JSON.stringify(prices, null, 2)}</pre>
}

export default UsePrices
