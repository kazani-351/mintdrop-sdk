import { AccessPass__factory } from "@mintdrop/contracts"
import { ContractFactory, Wallet } from "ethers"

import { ethToWei } from "../utils/conversion"

export const { abi, bytecode } = AccessPass__factory

type Contract = {
  name: string
  symbol: string
  baseTokenURI: string
  maxSupply: number
  royalties: number
  beneficiary: string
  mintPrice: number
  startTime: number
  endTime: number
  groups: Group[]
}

type Group = {
  signer: string
  mintPrice: number
  startTime: number
  maxPerWallet: number
}

export function getDeployData(contract: Contract): string {
  const signer = Wallet.createRandom()
  const factory = new ContractFactory(abi, bytecode, signer)

  const args = [
    contract.name,
    contract.symbol,
    contract.baseTokenURI,
    contract.maxSupply || 0, // default no max
    contract.royalties || 0, // default 0 royalties
    contract.beneficiary || "0x0000000000000000000000000000000000000000",
    [
      ethToWei(contract.mintPrice) || 0, // default 0 mint price
      contract.startTime || 0, // default not public mintable
      contract.endTime || 0 // default no end mint time
    ],
    contract.groups.map((g) => [
      g.signer,
      ethToWei(g.mintPrice),
      g.startTime || 0, // default always mintable
      g.maxPerWallet || 0
    ])
  ]

  console.log("DEPLOY ARGS", JSON.stringify(formatArgs(args), null, 2))

  try {
    const tx = factory.getDeployTransaction(...args)

    if (tx?.data) return tx.data as string
    throw new Error("Problem occurred during ")
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function getTxData(functionName, ...args): Promise<string> {
  const signer = Wallet.createRandom()
  const contract = new AccessPass__factory(signer)
  return contract.interface.encodeFunctionData(functionName, args)
}

function formatArgs(args: any[] | any) {
  if (Array.isArray(args)) {
    console.log({ args })
    return args.map((arg) => formatArgs(arg))
  } else {
    return args.toString()
  }
}
