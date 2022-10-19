import { useEffect, useState } from "react"
import { useAccount, useBlockNumber } from "wagmi"

import { Signature } from "../types"
import { useAPI } from "./useAPI"
import { useContract } from "./useContract"
import { useDrop } from "./useDrop"

type UseSignature = Signature & {
  valid: boolean
}

export function useSignature(): UseSignature {
  const { address } = useAccount()
  const block = useBlockNumber()
  const api = useAPI()
  const contract = useContract()
  const drop = useDrop()

  const [signer, setSigner] = useState<string>()
  const [sig, setSig] = useState<string>()
  const [valid, setValid] = useState<boolean>()

  useEffect(() => {
    if (!drop?.id || !address) return
    api.getSignature(address).then((res) => {
      if (res) {
        const { sig, signer } = res
        setSig(sig)
        setSigner(signer)
      } else {
        setSig(undefined)
        setSigner(undefined)
      }
    })
  }, [drop?.id, address])

  useEffect(() => {
    if (!sig) {
      setValid(undefined)
    } else {
      // Support old naming
      const func = contract.canGroupMint
        ? contract.canGroupMint(sig, 1)
        : contract.canSignatureMint(address, sig, 1)
      func.then(setValid).catch(() => setValid(false)) // this function throws at the contract with reason
    }
  }, [block, sig, contract])

  return {
    signer,
    sig,
    valid
  }
}
