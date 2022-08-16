---
title: useHeartbeat
description: Hook to provide time-based heartbeat for components.
---

Hook to provide time-based heartbeat for components.

```
import { useHeartbeat } from "@mintdrop/sdk"
```

## Usage

```ts
import { useHeartbeat } from "@mintdrop/sdk"

const Heartbeat = () => {
  useHeartbeat(1000)
  const date = new Date()

  return <div>Current date/time is {new Date().toLocaleString()}</div>
}
```

## Best Practices

When working with smart contracts, it is not enought to simply rely on the user's time (aka system clock). This can easily be faked and moved into the future and if they try and send a mint transaction, it will fail.
