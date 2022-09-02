import { BigNumber } from "ethers"
import { useEffect, useState } from "react"

import { useBlockBeat } from "./useBlockBeat"
import { useContract } from "./useContract"

export const useCounts = () => {
  const contract = useContract()
  const block = useBlockBeat()

  const [maxSupply, setMaxSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<number>(0)

  useEffect(() => {
    contract
      ?.maxSupply()
      .then((res: BigNumber) => res.toNumber())
      .then((supply) => {
        if (supply === 0) setMaxSupply(Number.POSITIVE_INFINITY)
        else setMaxSupply(supply)
      })
      .catch(console.error)
  }, [contract, block])

  useEffect(() => {
    contract
      ?.totalSupply()
      .then((res: BigNumber) => res.toNumber())
      .then(setTotalSupply)
      .catch(console.error)
  }, [contract, block])

  let remaining = maxSupply - totalSupply
  // This may or may not have been a problem before 🙈
  if (remaining < 0) remaining = 0

  return {
    maxSupply,
    totalSupply,
    remaining
  }
}
