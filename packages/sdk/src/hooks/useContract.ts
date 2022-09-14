import { Contract, ethers, providers, Signer } from "ethers"
import { useEffect, useState } from "react"
import { useProvider, useSigner } from "wagmi"

import { useDrop } from "./useDrop"

export function useContract(
  overrideProvider?: Signer | providers.Provider
): Contract | null {
  const drop = useDrop()
  const provider = useProvider()
  const { data: signer } = useSigner()
  const [contract, setContract] = useState<ethers.Contract>()

  useEffect(() => {
    const providerOrSigner = overrideProvider || signer || provider

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
