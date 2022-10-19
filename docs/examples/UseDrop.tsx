import { useDrop } from "@mintdrop/sdk"
import Day from "dayjs"
import LocalizedFormat from "dayjs/plugin/localizedFormat"

Day.extend(LocalizedFormat)

const UseDrop = () => {
  const drop = useDrop()

  return (
    <div className="p-2">
      Drop {drop?.id}
      <br />
      Mint Price: {drop?.mintPrice}
      <br />
      Start Time: {Day(drop?.startTime * 1000).format("LLL")}
      <br />
      Max Supply: {drop?.maxSupply}
    </div>
  )
}

export default UseDrop
