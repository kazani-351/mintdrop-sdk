---
title: usePrices
description: Hook to provide time-based heartbeat for components.
---

Hook to provide live ETH prices (from Coinbase)

```
import { usePrices } from "@mintdrop/sdk"
```

## Usage

```ts
import { usePrices } from "@mintdrop/sdk"

const Example = () => {
  const { prices } = usePrices()

  return <div>Current ETH price is {prices.ETH}</div>
}
```

## Returns

```ts
{
  loading: boolean,
  currency: "USD" // in the future we will support changing this
  prices: {
    "ETH": number,
    "MATIC": number
  }
}
```
