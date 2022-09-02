import { useContext } from "react"

import { Context } from "../components/MintdropProvider"
import type { Drop } from "../types"

export function useDrop(): Drop {
  return useContext(Context)
}
