import "nextra-theme-docs/style.css"
import { MintdropProvider, alchemyProvider } from "@mintdrop/sdk"

import "../styles/globals.css"
import type { AppProps } from "next/app"

function Nextra({ Component, pageProps }: AppProps) {
  return (
    <MintdropProvider
      drop="cl6s0aajb15890008tmcmwgedt48"
      providers={[
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY })
      ]}
    >
      <Component {...pageProps} />
    </MintdropProvider>
  )
}

export default Nextra
