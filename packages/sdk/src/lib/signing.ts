// Helpful ethers.js links:
// https://docs.ethers.io/v5/api/signer/#Signer-signMessage%5Bethers%5D
// https://docs.ethers.io/v5/api/utils/hashing/#utils-hashMessage

// If/when we want to add web3.js support
// https://web3js.readthedocs.io/en/v1.3.4/web3-eth-accounts.html#sign%5BWeb3.js%5D

// the secret to getting this working was this post: https://blog.cabala.co/how-to-verify-off-chain-results-and-whitelist-with-ecdsa-in-solidity-using-openzeppelin-ethers-js-ba4c85521711

import { Signer, utils } from "ethers"

/**
 * Pack the address and generate and nonce together and hash them
 * @param payload address
 * @returns hash
 */
export function hash(payload: string) {
  const message = utils.solidityPack(["address"], [payload])
  const hash = utils.keccak256(message)
  return hash
}

export function hashBin(message: string): Uint8Array {
  return utils.arrayify(hash(message))
}

export async function sign(signer: Signer, message: string) {
  return signer.signMessage(hashBin(message))
}

export function recoverAddress(message: string, signature: string) {
  // return utils.verifyMessage(hashBin(message), signature)
  return utils.verifyMessage(hashBin(message), signature)
}
