import { useContext } from "react"

import { Context } from "../providers/MintdropProvider"
import { Drop } from "../types"

export function useDrop(): Drop {
  const { drop } = useContext(Context)
  return drop
}
