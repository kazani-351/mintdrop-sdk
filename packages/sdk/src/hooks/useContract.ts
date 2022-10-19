import { Contract } from "ethers"
import { useContext } from "react"

import { Context } from "../providers/MintdropProvider"

export function useContract(): Contract {
  const { contract } = useContext(Context)
  return contract
}
