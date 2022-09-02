---
title: useDrop
description: Get the Mintdrop drop for the given context
---

Hook for accessing the current Mintdrop `drop` object.

```
import { useDrop } from "@mintdrop/sdk"
```

## Example

{% example name="useDrop" / %}

## Usage

```tsx
import { useDrop } from "@mintdrop/sdk"

const Example = () => {
  const drop = useDrop()

  return (
    <div>
      <h1>Contract {drop?.address}</h1>
      <p>{JSON.stringify(drop)}</p>
    </div>
  )
}
```

## Returns

```json
drop: {
  id: string

  address: string
  chainId: number        // see https://chainlist.org for full list
  abi: ContractInterface // contract ABI

  groups: {
    name: string         // group name (PREMINT Allowlist, VIPs, etc)
    signer: string       // group signer address
  }[]

  maxSupply: number
  startTime: number      // ETH timestamp (seconds)
  endTime: number        // ETH timestamp (seconds)
}
```

## Note

This requires the use of a `MintdropProvider` in order to access the proper context.

```tsx
import { MintdropProvider } from "@mintdrop/sdk"

const App = () => {
  return (
    <MintdropProvider drop="123">
      <MyComp />
    </MintdropProvider>
  )
}
```
