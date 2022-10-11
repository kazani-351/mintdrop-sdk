import { useEffect, useState } from "react"
import { useProvider, useWebSocketProvider } from "wagmi"

/**
 * Returns the current block
 * @param initial fetch current block on mount
 * @returns current block
 */
export function useBlockBeat(initial = true) {
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
