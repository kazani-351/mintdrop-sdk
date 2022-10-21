import { useDrop, withMintdrop } from "@mintdrop/sdk"
import { alchemyProvider } from "@mintdrop/sdk"
import { API, createClient, chain } from "@mintdrop/sdk"
import { useCallback, useEffect, useState } from "react"
import decoder from "abi-decoder"

const client = createClient({
  chains: [chain.goerli],
  providers: [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY })]
})

function Decoder() {
  const drop = useDrop()
  const [dropId, setDropId] = useState<string>()
  const [data, setData] = useState<string>("0x18160ddd")
  const [sdk, setSDK] = useState<API>()
  const [decoded, setDecoded] = useState<object>()

  console.log({ drop })

  useEffect(() => {
    if (!dropId) {
      setSDK(undefined)
      return
    }
    new API(dropId).init(client).then(setSDK)
  }, [dropId])

  useEffect(() => {
    if (!drop) {
      return
    }
    setDropId(drop?.id)
  }, [drop])

  const handleSubmit = useCallback(() => {
    if (!sdk) return
    decoder.addABI(sdk.drop?.abi)
    const decoded = decoder.decodeMethod(data)
    console.log({ decoded })
    setDecoded(decoded)
  }, [data, sdk])

  return (
    <div>
      <section className="flex space-x-2">
        <label htmlFor="dropId">Drop ID</label>
        <input
          name="dropId"
          type="text"
          value={dropId}
          onChange={(e) => setDropId(e.target.value)}
          className="border"
        />
      </section>

      <section className="flex space-x-2">
        <label htmlFor="dropId">Data</label>
        <input
          name="data"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="border"
        />
      </section>

      <section>{JSON.stringify(decoded)}</section>

      <button type="submit" disabled={!sdk?.drop} onClick={handleSubmit}>
        Check
      </button>
    </div>
  )
}

export default withMintdrop(Decoder, {
  drop: "cl9hqtvv91350wtyp07gy2y7k",
  host: "http://localhost:4000"
})
