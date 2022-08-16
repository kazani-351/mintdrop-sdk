import { BigNumber, ethers } from "ethers"
import { useEffect, useState } from "react"

import { useBlockBeat } from "./useBlockBeat"

export const useCounts = (contract: ethers.Contract) => {
  const block = useBlockBeat()
  // @todo - switch this over to contract totalSupply
  const total = 10_000

  const [mintCount, setMintCount] = useState<number>(0)

  useEffect(() => {
    contract
      ?.totalSupply()
      .then((res: BigNumber) => res.toNumber())
      .then(setMintCount)
      .catch(console.error)
  }, [contract, mintCount, block])

  let remaining = total - mintCount

  // This may or may not have been a problem before 🙈
  if (remaining < 0) remaining = 0

  return {
    mintCount,
    remaining
  }
}
