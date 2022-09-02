---
title: useContract
description: Get the Mintdrop contract for the given drop context
---

Hook for creating an ethers [Contract](https://docs.ethers.io/v5/api/contract/contract/) instance for the given Mintdrop drop.

```
import { useContract } from "@mintdrop/sdk"
```

## Usage

```ts
import { useContract } from "@mintdrop/sdk"

const Example = () => {
  const contract = useContract()

  const handleMint = () => {
    contract
      .publicMint(1)
      .then((receipt) => console.log("Tx Receipt", receipt))
      .catch((err) => console.error("Error during mint", err))
  }

  return (
    <div>
      <button onClick={handleMint}>Mint!</button>
    </div>
  )
}
```

## Returns

```json
contract: Contract
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
