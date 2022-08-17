import { ethers } from "ethers"
import { useEffect } from "react"

import { useBlockBeat } from "./useBlockBeat"

export type MintSignature = {
  sig?: string
  group?: string
  isUsed?: boolean
}

export function useSignature(
  address: string,
  contract: ethers.Contract
): MintSignature | null {
  const block = useBlockBeat()

  const signature = getSignature(address)

  const { value: isUsed } = useEffect(() => {
    if (!address || !signature) return null
    return contract.signatureUsed(address, signature.sig).catch(console.error)
  }, [contract, signature, address, block])

  if (!address || !signature || isUsed) return null

  return {
    ...signature,
    isUsed
  }
}

function getSignature(address: string | undefined) {
  if (!address) return null

  // @todo - hit Mintdrop API with address and get signature response.

  const sig = undefined
  const group = undefined
  const isUsed = undefined

  // const hashed = crypto
  //   .createHash("sha256")
  //   .update(address.toLowerCase())
  //   .digest("base64")

  // const reservedSig = reserved[hashed]
  // const unreservedSig = unreserved[hashed]

  // const sig = reservedSig || unreservedSig
  // const isReserved = !!reservedSig

  if (!sig) return null

  return {
    sig,
    group,
    isUsed
  }
}
