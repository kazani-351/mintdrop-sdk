import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

import { getSignature } from "../api"
import { Signature } from "../types"
import { useBlockBeat } from "./useBlockBeat"
import { useContract } from "./useContract"
import { useDrop } from "./useDrop"

type UseSignature = Signature & {
  valid: boolean
}

export function useSignature(): UseSignature {
  const block = useBlockBeat()
  const drop = useDrop()
  const { address } = useAccount()
  const contract = useContract()

  const [signer, setSigner] = useState<string>()
  const [sig, setSig] = useState<string>()
  const [valid, setValid] = useState<boolean>()

  useEffect(() => {
    if (!drop.id || !address) return
    getSignature(drop.id, address).then((res) => {
      if (res) {
        const { sig, signer } = res
        setSig(sig)
        setSigner(signer)
      } else {
        setSig(undefined)
        setSigner(undefined)
      }
    })
  }, [drop.id, address])

  useEffect(() => {
    if (!sig) {
      setValid(undefined)
    } else {
      contract
        .canGroupMint(sig, 1)
        .then(setValid)
        .catch(() => setValid(false)) // this function throws at the contract with reason
    }
  }, [block, sig, contract])

  return {
    signer,
    sig,
    valid
  }
}
