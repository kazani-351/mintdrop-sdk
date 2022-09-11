import { AccessPass__factory } from "@mintdrop/contracts"
import { ContractFactory, Wallet } from "ethers"

import { ethToWei } from "../utils/conversion"
import { Contract } from "./types"
import { formatGroups, formatPayouts } from "./utils"

export function getDeployData(contract: Contract): string {
  const { abi, bytecode } = AccessPass__factory
  const signer = Wallet.createRandom()
  const factory = new ContractFactory(abi, bytecode, signer)

  const args = [
    contract.name,
    contract.symbol,
    contract.baseTokenURI || "",
    contract.maxSupply || 0, // default no max
    formatPayouts(contract.payouts),
    contract.beneficiary || "0x0000000000000000000000000000000000000000",
    contract.royalties || 0, // default 0 royalties
    [
      ethToWei(contract.mintPrice) || 0, // default 0 mint price
      contract.startTime || 0, // default not public mintable
      contract.endTime || 0 // default no end mint time
    ],
    formatGroups(contract.groups)
  ]

  // console.log("DEPLOY ARGS", JSON.stringify(formatArgs(args), null, 2))

  try {
    const tx = factory.getDeployTransaction(...args)

    if (tx?.data) return tx.data as string
    throw new Error("Problem occurred during ")
  } catch (err) {
    console.error(err)
    throw err
  }
}
