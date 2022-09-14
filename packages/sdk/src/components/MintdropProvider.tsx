import { createContext, useEffect, useState } from "react"

import { getDrop, init } from "../api"
import { Drop } from "../types"

export const Context = createContext(undefined)

type Props = {
  children: any
  drop: string
  host?: string
}

export default function MintdropProvider(props: Props) {
  const { children, drop: dropId, host } = props
  const [drop, setDrop] = useState<Drop>()

  useEffect(() => {
    if (host) init(host)
  }, [host])

  useEffect(() => {
    if (!dropId) return
    getDrop(dropId).then(setDrop)
  }, [dropId])

  if (!dropId) return null

  return <Context.Provider value={drop}>{children}</Context.Provider>
}

export function mintdropHOC(Comp, props) {
  const mintdropHOCRender = () => (
    <MintdropProvider {...props}>
      <Comp />
    </MintdropProvider>
  )

  return mintdropHOCRender
}
