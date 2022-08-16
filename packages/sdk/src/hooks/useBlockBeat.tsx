import { useEffect, useState } from "react"
import { useProvider, useWebSocketProvider } from "wagmi"

type Opts = { initial?: boolean }

export function useBlockBeat(opts: Opts = {}) {
  const { initial = true } = opts || {}
  const provider = useProvider()
  const wsProvider = useWebSocketProvider()
  const [block, setBlock] = useState<number>()

  useEffect(() => {
    if (initial) provider.getBlockNumber().then(setBlock)
  }, [initial, provider])

  useEffect(() => {
    if (!wsProvider) return
    wsProvider?.on("block", (blockNum: number) => {
      console.debug("BLOCK", blockNum)
      setBlock(blockNum)
    })
  }, [wsProvider])

  return block
}
