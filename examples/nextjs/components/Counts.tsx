import { useCounts } from "@mintdrop/sdk"

export default function Counts() {
  const counts = useCounts()

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="p-2 border rounded">
        <h2 className="font-bold">Max</h2>
        <p>{counts.maxSupply || "-"}</p>
      </div>
      <div className="p-2 border rounded">
        <h2 className="font-bold">Minted</h2>
        <p>{counts.totalSupply || 0}</p>
      </div>
      <div className="p-2 border rounded">
        <h2 className="font-bold">Remaining</h2>
        <p>{counts.remaining || "-"}</p>
      </div>
    </div>
  )
}
