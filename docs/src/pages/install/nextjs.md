---
title: Next.js installation
description: Instructions on how to
---

## 1. Add MintdropProvider

Wrap your /pages/app.jsx or /pages/app.tsx with a `MintdropProvider`

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

Note: Make sure MintdropProvider inside of your `WagmiConfig` provider.

## 2. Start using Mintdrop hooks

Impor and start using Mintdrop inside your /pages components.

```tsx
import { useBlockBeat } from "@mintdrop/sdk"

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
