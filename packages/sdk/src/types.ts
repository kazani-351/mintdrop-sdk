import { ContractInterface } from "ethers"

export type Drop = {
  id: string

  title: string
  description: string
  maxSupply: number

  banner: string
  logo: string

  address: string
  chainId: number
  abi: ContractInterface

  groups: (Omit<AllowList, "exists"> & { name: string })[]

  mintPrice: number
  startTime: number
  endTime: number
  maxPerWallet: number
}

export type Counts = {
  maxSupply: number
  totalSupply: number
  remaining: number
}

export type Signature = {
  signer: string
  sig: string
  // msg: string // I think we're going to have to store the msg
}

export type AllowList = {
  exists: boolean
  mintCount: number
  mintPrice: number
  startTime: number
  maxPerWallet: number
}
