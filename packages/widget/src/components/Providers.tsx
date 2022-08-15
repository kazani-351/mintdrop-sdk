import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { publicProvider } from "wagmi/providers/public"

import { getChain } from "../lib/alchemy"

export const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.goerli, chain.rinkeby],
  [
    jsonRpcProvider({
      rpc: ({ id: chainId }: { id: number }) => {
        const chain = getChain(chainId)
        return {
          http: chain.httpUrl,
          webSocket: chain.wsUrl
        }
      }
    }),
    publicProvider()
  ]
)

const connectors = [
  new InjectedConnector({
    options: {
      shimDisconnect: true
    }
  })
]

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors
})

export default function Providers({ children }: { children: any }) {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
}
