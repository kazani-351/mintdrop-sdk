import { useEffect, useState } from "react"
import { useProvider, useWebSocketProvider } from "wagmi"

export function useBlockBeat() {
  const provider = useProvider()
  const wsProvider = useWebSocketProvider()
  const [block, setBlock] = useState<number>()

  useEffect(() => {
    provider.getBlockNumber().then(setBlock)
  }, [provider])

  useEffect(() => {
    if (!wsProvider) return
    wsProvider?.on("block", (blockNum: number) => {
      console.debug("BLOCK", blockNum)
      setBlock(blockNum)
    })
  }, [wsProvider])

  return block
}
