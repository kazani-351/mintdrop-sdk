import { ContractInterface } from "ethers"

export type Drop = {
  id: string

  title: string
  description: string
  slug: string
  maxSupply: number

  banner: string
  logo: string

  address: string
  chainId: number
  abi: ContractInterface
  groups: Group[]

  startTime: number
  endTime: number
}

export type Group = {
  name: string
  mintPrice: number
  startTime: number
}

export type Signature = {
  signer: string
  sig: string
  // msg: string // I think we're going to have to store the msg
}

export type ContractSigner = {
  exists: boolean
  maxPerWallet: number
  mintCount: number
  mintPrice: number
  startTime: number
}
