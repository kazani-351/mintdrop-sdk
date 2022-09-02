import Day from "dayjs"
import { ethers } from "hardhat"

export const deployContract = async function (
  contractName,
  constructorArgs: any[] = []
) {
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
  name?: string
  symbol?: string
  maxSupply?: number
  mintPrice?: string
  startTime?: number
  endTime?: number
  groups?: DeployAccessPassGroup[]
}

export const deployAccessPass = async function deploy(
  props: DeployAccessPassProps = {}
) {
  const {
    name = "AccessPassMock",
    symbol = "ACCESS_PASS_MOCK",
    maxSupply = 10000,
    mintPrice = 0,
    startTime = Day().unix(), // starts now
    endTime = 0,
    groups = []
  } = props

  return deployContract("AccessPassMock", [
    name,
    symbol,
    maxSupply,
    [mintPrice, startTime, endTime],
    groups
  ])
}

const defaults = { deployContract, deployAccessPass }

export default defaults
