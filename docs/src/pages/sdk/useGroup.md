---
title: useGroup
description: Hook to provide mint group info.
---

Hook to provide mint group info.

```
import { useGroup } from "@mintdrop/sdk"
```

## Usage

```tsx
import Day from "dayjs"
import { useGroup } from "@mintdrop/sdk"

const Example = () => {
  const group = useGroup()
  const time = group?.startTime
    ? Day.unix(group.startTime).format("LLLL")
    : "NOW"
  const price = group?.mintPrice && weiToEth(group.mintPrice)

  return (
    <div>
      <p>
        Group starts minting at {time} for {price}&Xi;
      </p>
      <p>Current Group mint count = {group?.mintCount}</p>
    </div>
  )
}
```

## Returns

```json
{
  exists: boolean,
  mintCount: number,
  mintPrice: number,    // in wei
  startTime: number,    // ETH seconds, 0 = anytime
  maxPerWallet: number  // 0 = infinite
}
```

## Note

Estimation uses useBlockBeat and will update on every new block.
