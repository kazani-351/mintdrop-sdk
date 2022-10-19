<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./docs/public/mintdrop-white.svg">
    <img alt="wagmi logo" src="./docs/public/mintdrop-black.svg" width="auto" height="60">
  </picture>
</p>

<p align="center">
  <!-- No-code NFT Membership + Subscription Platform -->
  The official SDK for working with MintDrop contracts and drops.
<p>

<div align="center">
  <a href="https://www.npmjs.com/package/@mintdrop/sdk">
    <img src="https://img.shields.io/npm/v/@mintdrop/sdk?colorA=21262d&colorB=161b22&style=flat" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/@mintdrop/sdk">
    <img src="https://img.shields.io/npm/dm/@mintdrop/sdk?colorA=21262d&colorB=161b22&style=flat" alt="Downloads per month">
  </a>
  <a href="https://getfoundry.sh/">
    <img src="https://img.shields.io/badge/Built%20with-Foundry-FFDB1C.svg" alt="Foundry Badge">
  </a>
</div>

<br>

## Documentation

See the official [Mintdrop Documentation](https://mintdrop.com/docs) for more guides and full documentation.

## Quickstart

Mindrop SDK requires wagmi + ethers. Follow the quickstart instructions on [Wagmi](https://wagmi.sh) for more info on setting up a project from scratch, or check out our [examples](./examples) directory.

Install `@mintdrop/sdk` and its ethers + wagmi peer dependencies.

```sh
npm i @mintdrop/sdk wagmi ethers
```

For React/Next.js projects, add MintdropProvider to your main App instance:

```tsx
import { MintdropProvider } from "@mintdrop/sdk"

const DROP_ID = "... your drop ID from dashboard"

const App = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={wagmiClient as any}>
      <MintdropProvider drop={DROP_ID}>
        <Component {...pageProps} />
      </MintdropProvider>
    </WagmiConfig>
  )
}

export default App
```

Then start using Mintdrop hooks in your pages/components:

```tsx
import { useBlockBeat, useDrop } from "@mintdrop/sdk"

export default HomePage = () => {
  const block = useBlockBeat()
  const drop = useDrop()

  return (
    <div>
      <p>
        Drop {drop.name} ({drop.symbol})
      </p>
      <p>Current block is {block}</p>
    </div>
  )
}
```
