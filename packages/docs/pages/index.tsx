import { useBlockBeat, useTiming } from "@mintdrop/sdk"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import moment from "moment"
import type { NextPage } from "next"
import Head from "next/head"
import { useState } from "react"

import SafeHydrate from "../components/SafeHydrate"

const Home: NextPage = () => {
  return (
    <SafeHydrate>
      <div className="p-20">
        <Head>
          <title>Mintdrop Docs</title>
          <meta name="description" content="..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="grid grid-cols-2 gap-5">
          <div className="col-span-3 p-5 border rounded">
            <h2 className="mb-5 text-xl">Rainbowkit integration</h2>
            <ConnectButton />
          </div>

          <UseBlockBeat />
          <UseTiming />
        </main>
      </div>
    </SafeHydrate>
  )
}

const UseBlockBeat = () => {
  const block = useBlockBeat()

  return (
    <div className="p-5 border rounded">
      <code>useBlockBeat()</code>
      <p>Block {block}</p>
    </div>
  )
}

const UseTiming = () => {
  const [when] = useState(moment().add(1, "day"))
  const timing = useTiming(when)

  return (
    <div className="p-5 border rounded">
      <code>{`useTiming(time: Moment, opts: Opts)`}</code>

      <div className="mt-3">
        <label>Returns</label>
        <pre className="block font-mono text-xs">
          {JSON.stringify({ ...timing, diff: "() => {}" }, null, 2)}
        </pre>
        <p>
          <code>now</code> {timing.now.format("LLL")}
        </p>
        <p>
          <code>complete</code> {JSON.stringify(timing.complete)}
        </p>
      </div>
    </div>
  )
}

export default Home
