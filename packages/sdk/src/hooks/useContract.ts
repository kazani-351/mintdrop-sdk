import { Contract, ethers, Signer } from "ethers"
import { useEffect, useState } from "react"
import { useContract, useWebSocketProvider } from "wagmi"

import { useBlockBeat } from "./useBlockBeat"

export const contract = (
  address: string,
  abi: ethers.ContractInterface,
  providerOrSigner?: Signer | ethers.providers.Provider
) => {
  return new ethers.Contract(address, abi, providerOrSigner)
}

export const useStaticContract = (
  addressOrName: string,
  abi: ethers.ContractInterface
) => {
  const provider = useWebSocketProvider()
  const contract = useContract({
    addressOrName,
    contractInterface: abi,
    signerOrProvider: provider
  })
  return contract
}

export const useSignedContract = (
  addressOrName: string,
  abi: ethers.ContractInterface,
  signer: any
): Contract | null => {
  const contract = useContract({
    addressOrName,
    contractInterface: abi,
    signerOrProvider: signer
  })
  return contract
}

export const useContractStatus = (
  contract: ethers.Contract
): {
  paused: boolean
  unreservedMintingOpen: boolean
} => {
  const [paused, setPaused] = useState<boolean>(false)
  const [unreservedMintingOpen, setUnreservedMintingOpen] =
    useState<boolean>(false)

  const block = useBlockBeat()

  useEffect(() => {
    contract?.paused().then(setPaused)
    contract?.unreservedMintingOpen().then(setUnreservedMintingOpen)
  }, [block, contract])

  return {
    paused,
    unreservedMintingOpen
  }
}
