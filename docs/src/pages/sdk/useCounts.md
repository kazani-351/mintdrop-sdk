---
title: useCounts
description: Hook to get mint counts and remaining from a Mintdrop contract.
---

Hook to get mint counts and remaining from a Mintdrop contract.

```
import { useBlockBeat } from "@mintdrop/sdk"
```

## Usage

```ts
import { useCounts } from "@mintdrop/sdk"

const Counts = () => {
  const block = useCounts()

  return (
    <div>
      <code>useCounts()</code>
      <p>Block {block}</p>
    </div>
  )
}
```

## Returns

```json
{
  mintCount: number,
  remaining: number
}
```
