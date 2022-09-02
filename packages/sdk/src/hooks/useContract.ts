import { Contract, providers, Signer } from "ethers"
import { useContract as useWagmiContract, useSigner } from "wagmi"

import { useDrop } from "./useDrop"

export function useContract(provider?: Signer | providers.Provider): Contract {
  const { address, abi } = useDrop()
  const { data: signer } = useSigner()
  const contract = useWagmiContract({
    addressOrName: address,
    contractInterface: abi,
    signerOrProvider: provider || signer
  })

  return contract
}
