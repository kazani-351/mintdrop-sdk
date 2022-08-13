import { BigNumber, ethers } from "ethers"
import { useEffect, useState } from "react"

import { useBlockBeat } from "./useBlockBeat"

export const useCounts = (contract: ethers.Contract) => {
  const block = useBlockBeat()

  const [mintCount, setMintCount] = useState<number>(0)

  // const [reservedCount, setReserved] = useState<number>(0)
  // const [unreservedCount, setUnreserved] = useState<number>(0)

  // @todo - switch this over to contract totalSupply
  const total = 10_000

  useEffect(() => {
    contract
      ?.totalSupply()
      .then((res: BigNumber) => res.toNumber())
      .then(setMintCount)
      .catch(console.error)

    // contract
    //   ?.unreservedRemaining()
    //   .then((res: BigNumber) => {
    //     const remaining = res.toNumber()
    //     const unreservedMinted = UNRESERVED_TOTAL - remaining
    //     setUnreserved(unreservedMinted)
    //     const reservedMinted = mintCount - unreservedMinted
    //     setReserved(reservedMinted)
    //   })
    //   .catch(console.error)
  }, [contract, mintCount, block])

  let remaining = total - mintCount
  // Don't trust math that's not done on-contract. This has been a problem before 🙈
  if (remaining < 0) remaining = 0

  return {
    mintCount,
    // reservedCount,
    // reservedRemaining: RESERVED_TOTAL - reservedCount,
    // unreservedCount,
    // unreservedRemaining: UNRESERVED_TOTAL - unreservedCount,
    remaining
  }
}

// function calculateRemaining(mintCount: number, unreservedRemaining: number) {
//   const unreservedMinted = UNRESERVED_TOTAL - unreservedRemaining
//   const reservedMinted = mintCount - unreservedMinted

//   return {
//     unreservedMinted,
//     reservedMinted
//   }
// }
