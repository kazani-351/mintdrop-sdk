import { useCallback, useEffect, useState } from "react"

import { ethToWei, weiToEth } from "../utils"
import { useBlockBeat } from "./useBlockBeat"
import { useContract } from "./useContract"
import { useGroup } from "./useGroup"
import { useSignature } from "./useSignature"

const DEFAULTS = {
  timeout: 3000
}

type PublicConfig = {
  mintPrice: number
  startTime: number
  endTime: number
}

export function useMinting(opts = DEFAULTS) {
  const { timeout } = opts

  const block = useBlockBeat()
  const contract = useContract()
  const signature = useSignature()
  const group = useGroup()

  const [config, setConfig] = useState<PublicConfig>()
  const [canPublicMint, setCanPublicMint] = useState(false)

  const [isMinting, setMinting] = useState(false)
  const [isSuccess, setSuccess] = useState(false)

  const canSignatureMint = !!signature?.valid
  const canMint = canSignatureMint || canPublicMint

  useEffect(() => {
    contract?.mintConfig().then((config) => {
      setConfig({
        mintPrice: weiToEth(config.mintPrice),
        startTime: config.startTime?.toNumber(),
        endTime: config.endTime?.toNumber()
      })
    })
  }, [contract])

  useEffect(() => {
    contract
      ?.canPublicMint(1)
      .then(setCanPublicMint)
      .catch(() => setCanPublicMint(false)) // this function throws at the contract with reason
  }, [block, contract])

  const signatureMint = useCallback(
    (count: number) => {
      setMinting(true)

      const value = ethToWei(group.mintPrice * count)
      // Support the old groupMint function for now
      const func = contract.signatureMint || contract.groupMint
      return func(signature.sig, count, {
        value
      })
        .then((res) => res.wait())
        .then((receipt) => {
          console.log("RECEIPT", receipt)
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, timeout)

          return receipt
        })
        .finally(() => setMinting(false))
    },
    [contract, group, signature, timeout]
  )

  const publicMint = useCallback(
    (count: number) => {
      setMinting(true)
      const value = ethToWei(config.mintPrice * count)

      return contract
        .publicMint(count, {
          value
        })
        .then((res) => res.wait())
        .then((receipt) => {
          console.log("RECEIPT", receipt)
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, timeout)

          return receipt
        })
        .finally(() => setMinting(false))
    },
    [contract, config, timeout]
  )

  return {
    isMinting,
    isSuccess,
    canSignatureMint,
    canPublicMint,
    canMint,
    config,
    signatureMint,
    publicMint
  }
}
