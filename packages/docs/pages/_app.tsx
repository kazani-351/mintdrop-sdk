import "../styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import type { AppProps } from "next/app"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"

const { chains, provider, webSocketProvider } = configureChains(
  [chain.rinkeby],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
    publicProvider()
  ]
)

const { connectors } = getDefaultWallets({
  appName: "Mintdrop Docs",
  chains
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
