import { Contract, ethers, providers, Signer } from "ethers"
import { useEffect, useState } from "react"
import { useSigner } from "wagmi"

import { useDrop } from "./useDrop"

export function useContract(
  provider?: Signer | providers.Provider
): Contract | null {
  const drop = useDrop()
  const { data: signer } = useSigner()
  const [contract, setContract] = useState<ethers.Contract>()
  useEffect(() => {
    const providerOrSigner = provider || signer

    if (!drop || !providerOrSigner) {
      if (drop) {
        console.error(
          "No provider set, please add a wagmi provider to use contract"
        )
      }
      setContract(null)
    } else {
      setContract(new ethers.Contract(drop.address, drop.abi, providerOrSigner))
    }
  }, [drop, provider, signer])

  return contract
}
