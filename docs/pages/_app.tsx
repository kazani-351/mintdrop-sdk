import "nextra-theme-docs/style.css"
import { MintdropProvider } from "@mintdrop/sdk"

import "../styles/globals.css"
import type { AppProps } from "next/app"

function Nextra({ Component, pageProps }: AppProps) {
  return (
    <MintdropProvider
      drop="cl9ddybk00001ypv5pf2vx1mn"
      host="http://localhost:4000"
    >
      <Component {...pageProps} />
    </MintdropProvider>
  )
}

export default Nextra
