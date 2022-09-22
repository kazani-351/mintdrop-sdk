import { BigNumberish, ethers, utils } from "ethers"

export function weiToEth(wei: BigNumberish) {
  return parseFloat(utils.formatEther(wei.toString()))
}

export function ethToWei(eth: number) {
  if (typeof eth === "undefined") return null
  return ethers.utils.parseUnits(eth.toString(), "ether")
}
