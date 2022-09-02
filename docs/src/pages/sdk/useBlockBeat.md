---
title: useBlockBeat
description: React hook to allow components to tap into a steam of new blocks.
---

Hook to access current and new block mining.

```
import { useBlockBeat } from "@mintdrop/sdk"
```

## Example

{% example name="useBlockBeat" / %}

## Usage

```ts
import { useBlockBeat } from "@mintdrop/sdk"

const Example = () => {
  const block = useBlockBeat()
  return <p>Block {block}</p>
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
