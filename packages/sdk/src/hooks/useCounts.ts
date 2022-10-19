import { BigNumber } from "ethers"
import { useEffect, useState } from "react"
import { useBlockNumber } from "wagmi"
import { useContract } from "./useContract"

export const useCounts = () => {
  const block = useBlockNumber()
  const contract = useContract()

  const [maxSupply, setMaxSupply] = useState(Number.POSITIVE_INFINITY)
  const [totalSupply, setTotalSupply] = useState(0)

  useEffect(() => {
    contract
      ?.maxSupply?.()
      .then((res: BigNumber) => res.toNumber())
      .then((supply: number) => {
        if (supply === 0) setMaxSupply(Number.POSITIVE_INFINITY)
        else setMaxSupply(supply)
      })
      .catch(console.error)
  }, [contract, block])

  useEffect(() => {
    contract
      ?.totalSupply()
      .then((res: BigNumber) => res.toNumber())
      .then((num) => {
        setTotalSupply(num)
      })
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
