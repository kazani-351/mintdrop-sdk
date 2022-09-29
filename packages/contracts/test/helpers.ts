import type { Contract } from "ethers"
import Day from "dayjs"
import { ethers } from "hardhat"

export const deployContract = async function (
  contractName: string,
  constructorArgs?: unknown[]
): Promise<Contract> {
  const factory = await ethers.getContractFactory(contractName)
  const contract = await factory.deploy(...(constructorArgs || []))
  await contract.deployed()
  return contract
}

export type DeployAccessPassGroup = [
  signer: string,
  mintPrice: string,
  startTime: number,
  maxPerWallet: number
]

export type DeployAccessPassProps = {
  contractName?: string
  name?: string
  symbol?: string
  maxSupply?: number
  mintPrice?: string
  startTime?: number
  maxPerWallet?: number
  endTime?: number
  groups?: DeployAccessPassGroup[]
  payouts?: {
    addresses: string[]
    shares: number[]
  }
  royalties?: {
    beneficiary: string
    bips: number
  }
}

export const deployMintdrop = async function deploy(
  props: DeployAccessPassProps = {}
) {
  const {
    contractName = "MintdropMock",
    name = "MintdropMock",
    symbol = "MINTDROP_MOCK",
    maxSupply = 10000,
    mintPrice = 0,
    startTime = Day().subtract(1, "hour").unix(), // starts now
    endTime = 0,
    maxPerWallet = 0,
    groups = [],
    payouts = {
      addresses: ["0x0000000000000000000000000000000000000000"],
      shares: [10000]
    },
    royalties = {
      beneficiary: "0x0000000000000000000000000000000000000000",
      bips: 0
    }
  } = props

  const args = [
    name,
    symbol,
    "https://mintdrop.example/",
    maxSupply,
    endTime,
    [mintPrice, startTime, maxPerWallet],
    groups,
    [payouts.addresses, payouts.shares],
    [royalties.beneficiary, royalties.bips]
  ]

  return deployContract(contractName, args)
}

const defaults = { deployContract, deployMintdrop }

export default defaults
