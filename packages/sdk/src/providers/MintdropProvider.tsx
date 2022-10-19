import React, { createContext, ReactNode, useEffect, useState } from "react"
import {
  chain,
  configureChains,
  createClient as createWagmiClient,
  WagmiConfig
} from "wagmi"
import { ConnectKitProvider, getDefaultClient } from "connectkit"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import type { WagmiConfigProps } from "wagmi"

import { API } from "../client/api"

export const Context = createContext({
  loading: true,
  contract: undefined,
  drop: undefined,
  api: undefined
})

type Props = {
  children: ReactNode
  client?: WagmiConfigProps["client"]
  drop: string
  host?: string
}

function Provider(props: Props) {
  const { children, client, drop: dropId, host } = props
  const [loading, setLoading] = useState<boolean>(true)
  const [api, setAPI] = useState<API>()

  useEffect(() => {
    setLoading(true)
    const api = new API(dropId, { host })
    api.init(client).then(() => {
      setAPI(api)
      setLoading(false)
    })
  }, [])

  if (!dropId) return null

  const value = {
    loading,
    drop: api?.drop,
    contract: api?.contract,
    api
  }

  return (
    <Context.Provider value={value}>
      <div className="__mintdrop">{children}</div>
    </Context.Provider>
  )
}

export default function MintdropProvider({
  children,
  client = createClient(),
  ...props
}: Props) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider
        theme="auto"
        mode="dark"
        customTheme={{
          "--ck-spinner-color": "#53DDB4",
          "--ck-body-background": "rgba(26, 27, 47, 1.00)",
          "--ck-body-background-secondary": "rgba(26, 27, 47, 1.00)",
          "--ck-body-background-tertiary": "rgba(26, 27, 47, 1.00)",
          "--ck-border-radius": "10px",
          "--ck-secondary-button-color": "#1A1B2F",
          "--ck-secondary-button-background": "#E9ECEE",
          "--ck-secondary-button-hover-background": "#DDE2E5"
        }}
      >
        <Provider client={client} {...props}>
          {children}
        </Provider>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

const createClient = () => {
  const { chains, provider, webSocketProvider } = configureChains(
    // [chain.rinkeby],
    [chain.mainnet, chain.goerli, chain.rinkeby],
    [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
      publicProvider()
    ]
  )

  const connectKitProvider = getDefaultClient({
    appName: "Mintdrop",
    chains,
    autoConnect: true,
    provider
  })

  // @ts-ignore
  const wagmiClient = createWagmiClient({
    ...connectKitProvider,
    webSocketProvider
  })

  return wagmiClient
}

export function withMintdrop(
  Comp: (any) => JSX.Element,
  props: Omit<Props, "children">
) {
  const mintdropHOCRender = () => (
    <MintdropProvider {...props}>
      <Comp />
    </MintdropProvider>
  )

  return mintdropHOCRender
}
