---
title: useMinting
description: Hook to provide minting capabilities for Mintdrop contracts.
---

Hook to provide minting capabilities for Mintdrop contracts.

```
import { useMinting } from "@mintdrop/sdk"
```

## Usage

```ts
import { useMinting } from "@mintdrop/sdk"

const Example = () => {
  const {
    isMinting,
    isSuccess,
    canPublicMint,
    canSignatureMint,
    signatureMint,
    publicMint
  } = useMinting()

  const errorHandler = (err) => {
    console.error(err)
  }

  const handleGroupMint = ({ count }) => {
    signatureMint(count).catch(errorHandler)
  }

  const handlePublicMint = ({ count }) => {
    publicMint(count).catch(errorHandler)
  }

  return (
    <div>
      <button onClick={handleGroupMint} disabled={!canSignatureMint}>
        Group Mint
      </button>
      <button onClick={handlePublicMint} disabled={!canPublicMint}>
        Public Mint
      </button>
    </div>
  )
}
```

## Returns

```ts
{
  isMinting: boolean,
  isSuccess: boolean,   // this will stay true for 3s after minting
  canSignatureMint: boolean,
  canPublicMint: boolean,
  canMint: boolean,
  config: {
    mintPrice: number   // public mint price
    startTime: number   // public start time in ETH seconds
    endTime: number     // public end time in ETH seconds
  },
  signatureMint: (signature: string, count: number) => TransactionReceipt,
  publicMint: (count: number) => TransactionReceipt
}
```
