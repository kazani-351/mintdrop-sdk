---
title: useTiming
description: Hook to provide countdown abilities for a date in the future.
---

Hook to provide countdown abilities for a date in the future.

```
import { useTiming } from "@mintdrop/sdk"
```

## Usage

```ts
import { useBlockBeat } from "@mintdrop/sdk"

const Countdown = () => {
  const [when] = useState(moment().add(1, "day"))
  const timing = useTiming(when)

  return (
    <div>
      <label>Returns</label>
      <pre>{JSON.stringify({ ...timing, diff: "() => {}" }, null, 2)}</pre>
      <p>
        <code>now</code> {timing.now.format("LLL")}
      </p>
      <p>
        <code>complete</code> {JSON.stringify(timing.complete)}
      </p>
    </div>
  )
}
```

## Returns

```json
{
  now: Moment
  diff: (unitOfTime.Diff = "minute") => string
  complete: boolean
}
```

## Best Practices

When working with smart contracts, it is not enought to simply rely on the user's time (aka system clock). This can easily be faked and moved into the future and if they try and send a mint transaction, it will fail.
