import { Contract, ethers, providers, Signer } from "ethers"
import { useEffect, useState } from "react"
import { useSigner } from "wagmi"

import { useDrop } from "./useDrop"

export function useContract(
  provider?: Signer | providers.Provider
): Contract | null {
  const { address, abi } = useDrop()
  const { data: signer } = useSigner()
  const [contract, setContract] = useState<ethers.Contract>()
  useEffect(() => {
    if (!address || !abi) {
      setContract(null)
    } else {
      setContract(new ethers.Contract(address, abi, provider || signer))
    }
  }, [])

  return contract
}
