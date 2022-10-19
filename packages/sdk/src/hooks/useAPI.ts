import { useContext } from "react"
import { API } from "../client/api"

import { Context } from "../providers/MintdropProvider"

export function useAPI(): API {
  const { api } = useContext(Context)
  return api
}
