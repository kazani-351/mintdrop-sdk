---
title: useSignature
description: Hook to provide access to signatures for minting.
---

Hook to provide access to signatures for minting using the currently connected wallet.

```
import { useSignature } from "@mintdrop/sdk"
```

## Note

In most cases you should be using [useMinting](/docs/sdk/useMinting) since it will handle all signature-based minting for you through the `signatureMint` function.

## Usage

```tsx
import { useAccount } from "wagmi"
import { useSignature } from "@mintdrop/sdk"

const Example = () => {
  const { address } = useAccount()
  const { sig, valid } = useSignature()

  return (
    <div>
      <p>Current Wallet: {address}</p>
      <p>Signature: {sig}</p>
      <p>Valid: {valid ? "VALID" : "INVALID"}</p>
    </div>
  )
}
```

## Returns

```ts
{
  signer: string,
  sig: string,
  valid: boolean
}
```
