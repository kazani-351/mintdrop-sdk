import { Head, Html, Main, NextScript } from "next/document"

import { DARK_MODE_INIT_SCRIPT } from "@/lib/darkMode"

function Document() {
  return (
    <Html className="antialiased [font-feature-settings:'ss01']" lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: DARK_MODE_INIT_SCRIPT }} />
      </Head>
      <body className="bg-white dark:bg-black-500">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
