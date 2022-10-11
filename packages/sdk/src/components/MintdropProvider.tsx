import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState
} from "react"

import { getDrop, init } from "../api"
import { Drop } from "../types"

export const Context = createContext(undefined)

type Props = PropsWithChildren<{
  drop: string
  host?: string
}>

export default function MintdropProvider({
  children,
  drop: dropId,
  host
}: Props) {
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

export function mintdropHOC(Comp: any, props: Props) {
  const mintdropHOCRender = () => (
    <MintdropProvider {...props}>
      <Comp />
    </MintdropProvider>
  )

  return mintdropHOCRender
}
