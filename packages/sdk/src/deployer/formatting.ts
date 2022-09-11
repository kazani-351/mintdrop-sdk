import { ethToWei } from "../utils"
import type { Group, Payouts } from "./types"

export function formatMintConfig(contract) {
  return [
    ethToWei(contract.mintPrice) || 0, // default 0 mint price
    contract.startTime || 0, // default not public mintable
    contract.endTime || 0 // default no end mint time
  ]
}

export function formatPayouts(payouts: Payouts) {
  const formatted = Object.entries(payouts || {}).reduce(
    (acc, [address, percent]) => {
      const [addresses, shares] = acc
      addresses.push(address)
      shares.push(percent)
      return [addresses, shares]
    },
    [[], []]
  )

  if (formatted[0].length === 0) {
    throw new Error(
      "No payouts addresses specified, contract balance will be inaccessible."
    )
  }

  if (sum(formatted[1]) !== 100) {
    throw new Error("Shares do not add up to 100 percent")
  }

  return formatted
}

function sum(vals) {
  return vals.reduce((partialSum, a) => partialSum + a, 0)
}

export function formatGroups(groups: Group[]) {
  return (
    groups?.map((g) => [
      g.signer,
      ethToWei(g.mintPrice),
      g.startTime || 0, // default always mintable
      g.maxPerWallet || 0
    ]) || []
  )
}
