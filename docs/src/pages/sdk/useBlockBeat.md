---
title: useBlockBeat
description: React hook to allow components to tap into a steam of new blocks.
---

Hook to access current and new block mining.

```
import { useBlockBeat } from "@mintdrop/sdk"
```

## Usage

```ts
import { useBlockBeat } from "@mintdrop/sdk"

const Block = () => {
  const block = useBlockBeat()

  return (
    <div>
      <code>useBlockBeat()</code>
      <p>Block {block}</p>
    </div>
  )
}
```

## Returns

```json
block: number
```

## Best Practices

Often when working with smart contracts, you'll want your frontend UI to always be in sync with the state of the deployed smart contract.

Rather than polling, a common pattern here is to listen for new block events and then query the contract for state changes.

This works well since state changes only happen on new blocks.
