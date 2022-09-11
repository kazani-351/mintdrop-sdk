import { AccessPass__factory } from "@mintdrop/contracts"
import { Wallet } from "ethers"

export async function getTxData(functionName, ...args): Promise<string> {
  const signer = Wallet.createRandom()
  const contract = new AccessPass__factory(signer)
  return contract.interface.encodeFunctionData(functionName, args)
}
