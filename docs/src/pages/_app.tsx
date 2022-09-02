import "../styles/tailwind.css"
import "focus-visible"

import Head from "next/head"
import { IntercomProvider } from "react-use-intercom"

import { Layout } from "@/components/Layout"
// import Password from "@/components/Password"
import Web3Provider from "@/components/Web3Provider"
import colors from "@/lib/colors"
import { useSEO } from "@/lib/seo"

const INTERCOM_APP_ID = "gyp2tgs2"

function App(props) {
  const { Component, pageProps } = props
  const { title, pageTitle, description, tableOfContents } = useSEO(pageProps)

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      {/* <Password> */}
      <Web3Provider>
        <Layout title={title} tableOfContents={tableOfContents}>
          <IntercomProvider
            appId={INTERCOM_APP_ID}
            autoBoot
            autoBootProps={{
              actionColor: colors.blue
            }}
          >
            <Component {...pageProps} />
          </IntercomProvider>
        </Layout>
      </Web3Provider>
      {/* </Password> */}
    </div>
  )
}

export default App
