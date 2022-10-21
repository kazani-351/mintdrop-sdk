import { useEffect, useState } from "react"
import { useBlockNumber } from "wagmi"
import { useAPI } from "./useAPI"

export const useCounts = () => {
  const api = useAPI()
  const block = useBlockNumber()

  const [maxSupply, setMaxSupply] = useState(Number.POSITIVE_INFINITY)
  const [totalSupply, setTotalSupply] = useState(0)

  useEffect(() => {
    if (!api) return
    api.getCounts()?.then(({ totalSupply, maxSupply }) => {
      setMaxSupply(maxSupply)
      setTotalSupply(totalSupply)
    })
  }, [api, block])

  let remaining = maxSupply - totalSupply
  // This may or may not have been a problem before 🙈
  if (remaining < 0) remaining = 0

  return {
    maxSupply,
    totalSupply,
    remaining
  }
}
