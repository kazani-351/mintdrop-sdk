export type Contract = {
  name: string
  symbol: string
  baseTokenURI: string
  maxSupply: number
  payouts: Payouts
  royalties: number
  beneficiary: string
  mintPrice: number
  startTime: number
  endTime: number
  groups: Group[]
}

export type Payouts = {
  [address: string]: number
}

export type Group = {
  signer: string
  mintPrice: number
  startTime: number
  maxPerWallet: number
}
