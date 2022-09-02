---
title: MintdropProvider
description: Provides Mintdrop Drop context to your application.
---

Provides Mintdrop Drop context to your application.

```
import { MintdropProvider } from "@mintdrop/sdk"
```

## Next.js

Note: Make sure to put the MintdropProvider inside of your `WagmiConfig` provider.

```tsx
import { MintdropProvider } from "@mintdrop/sdk"

const DROP_ID = "... your drop ID"

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
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
