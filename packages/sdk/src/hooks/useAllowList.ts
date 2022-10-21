import { useEffect, useState } from "react"
import Day from "dayjs"

import { weiToEth } from "../utils"
import { useSignature } from "./useSignature"
import { useContract } from "./useContract"

type AllowList = {
  exists: boolean
  mintCount: number
  mintPrice: number
  maxPerWallet: number
  startTime: Date
}

export function useAllowList(): AllowList | null {
  const signature = useSignature()
  const contract = useContract()

  const [exists, setExists] = useState<boolean>()
  const [maxPerWallet, setMaxPerWallet] = useState<number>()
  const [mintPrice, setMintPrice] = useState<number>()
  const [startTime, setStartTime] = useState<Date>()
  const [mintCount, setMintCount] = useState<number>()

  const reset = () => {
    setExists(false)
    setMintCount(undefined)
    setMintPrice(undefined)
    setMaxPerWallet(undefined)
    setStartTime(undefined)
  }

  // if there's a sig, grab details from the contract
  useEffect(() => {
    if (!contract || !signature?.signer) {
      reset()
      return
    }

    // Support old method signature
    const func = contract.allowLists || contract.accessLists || contract.groups

    func(signature.signer)
      .then((access) => {
        if (!access.exists) {
          reset()
        } else {
          setExists(true)
          setMintCount(access.mintCount.toNumber())
          setMintPrice(weiToEth(access.mintPrice))
          setMaxPerWallet(access.maxPerWallet.toNumber())

          setStartTime(
            Day.unix(access.maxPerWallet.startTime.toNumber()).toDate() as Date
          )
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }, [contract, signature])

  if (exists) {
    return {
      exists,
      mintCount,
      mintPrice,
      maxPerWallet,
      startTime
    }
  }

  return null
}
