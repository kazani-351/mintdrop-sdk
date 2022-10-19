import Logo from "./components/Logo"

const config = {
  project: {
    link: "https://github.com/mintdrop-xyz/sdk"
  },
  docsRepositoryBase: "https://github.com/mintdrop-xyz/sdk/blob/main/docs", // base URL for the docs repository
  titleSuffix: " – MintDrop",
  navigation: {
    next: true,
    prev: true
  },
  nextThemes: {
    defaultTheme: "dark"
  },
  darkMode: true,
  sidebar: {
    // defaultMenuCollapsed: true
    // titleComponent: ({ title }) => (
    //   <h4 style={{ fontWeight: "bold", color: "white" }}>{title}</h4>
    // )
  },
  // banner: {
  //   key: "banner",
  //   text: "Announce something new here!"
  // },
  footer: false,
  // footer: {
  //   text: `${new Date().getFullYear()} © MintDrop.`
  // },
  editLink: `Edit this page on GitHub`,
  logo: (
    <span className="flex">
      <Logo />
      <span style={{ marginLeft: 8 }}>Documentation</span>
    </span>
  ),
  head: (
    <>
      <link rel="icon" href="/docs/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="og:title" content="MintDrop Documentation + SDK" />
      <meta
        name="description"
        content="Full SDK documentation - Use our Javascript/Typescript or React libraries to embed minting / token gating anywhere."
      />
    </>
  )
}

export default config
