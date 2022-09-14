import "../styles/globals.css"

import { ConnectKitProvider, getDefaultClient } from "connectkit"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"

import type { AppProps } from "next/app"
import { MintdropProvider } from "@mintdrop/sdk"
import { publicProvider } from "wagmi/providers/public"

import { alchemyProvider } from "wagmi/providers/alchemy"

const providers = []

/**
 * @dev - Recommended: If you want to make contract calls
 * without the user's wallet, you'll need to add a provider.
 */
if (process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
  providers.push(
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY })
  )

providers.push(publicProvider())

export const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli],
  providers
)

const connectKitProvider = getDefaultClient({
  appName: "Mintdrop Example",
  chains,
  autoConnect: true,
  provider
})

export const wagmiClient = createClient({
  ...connectKitProvider,
  webSocketProvider
}) as any

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient as any}>
      <ConnectKitProvider theme="auto" mode="dark">
        <MintdropProvider drop="cl81yyumd9047500wmc8q06sl12">
          <Component {...pageProps} />
        </MintdropProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
