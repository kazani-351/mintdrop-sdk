import { ethToWei } from "../utils"
import type { Payouts } from "./types"

export function formatArgs(args: any[] | any) {
  if (Array.isArray(args)) {
    return args.map((arg) => formatArgs(arg))
  } else {
    return args?.toString()
  }
}

export function formatPayouts(payouts: Payouts) {
  return Object.entries(payouts || {}).reduce(
    (acc, [address, percent]) => {
      const [addresses, shares] = acc
      addresses.push(address)
      shares.push(percent)
      return [addresses, shares]
    },
    [[], []]
  )
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
