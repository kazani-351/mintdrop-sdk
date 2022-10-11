# Mintdrop SDK

The official SDK for working with MintDrop contracts and drops.

## Quickstart

Install @mintdrop/sdk and its ethers + wagmi peer dependencies.

```sh
npm i @mintdrop/sdk wagmi ethers
```

Note - Mindrop SDK currently requires wagmi + ethers.

Follow the instructions on [Wagmi](https://wagmi.sh) for more info.

## React/Next.js

MintDrop works great with React + Next.js projects.

Add MintdropProvider to your main App instance:

```tsx
import { MintdropProvider } from "@mintdrop/sdk"

const DROP_ID = "... your drop ID"

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

See the [Official Documentation](https://mintdrop.com/docs) for more guides and information.
