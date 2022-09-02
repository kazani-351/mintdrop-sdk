import { ethers, utils } from "ethers"

export function weiToEth(wei) {
  return parseFloat(utils.formatEther(wei.toString()))
}

export function ethToWei(eth) {
  if (!eth) return null
  return ethers.utils.parseUnits(eth.toString(), "ether")
}
