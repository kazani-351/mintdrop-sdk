import { AccessPass__factory } from "@mintdrop/contracts"
import { ContractFactory, Wallet } from "ethers"

import { Contract } from "./types"
import { formatGroups, formatMintConfig, formatPayouts } from "./formatting"

export function getDeployData(contract: Contract): string {
  const { abi, bytecode } = AccessPass__factory
  const signer = Wallet.createRandom()
  const factory = new ContractFactory(abi, bytecode, signer)
  const args = formatArgs(contract)

  try {
    const tx = factory.getDeployTransaction(...args)

    if (tx?.data) return tx.data as string
    throw new Error("Problem occurred during ")
  } catch (err) {
    console.error(err)
    throw err
  }
}

export function formatArgs(contract: Contract) {
  return [
    contract.name,
    contract.symbol,
    contract.baseTokenURI || "",
    contract.maxSupply || 0, // default no max
    formatPayouts(contract.payouts),
    contract.beneficiary || "0x0000000000000000000000000000000000000000",
    contract.royalties || 0, // default 0 royalties
    formatMintConfig(contract),
    formatGroups(contract.groups)
  ]
}

// function logArgs(args) {
//   function formatArgs(args: any[] | any) {
//     if (Array.isArray(args)) {
//       return args.map((arg) => formatArgs(arg))
//     } else {
//       return args?.toString()
//     }
//   }

//   console.log("DEPLOY ARGS", JSON.stringify(formatArgs(args), null, 2))
// }
