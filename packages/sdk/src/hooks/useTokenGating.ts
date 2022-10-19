import { useEffect, useState } from "react"
import { useContract } from "./useContract"

type UseTokenGating = {
  loading: boolean
  wallet: string
  allow: boolean
  deny: boolean
}

export function useTokenGating(
  wallet: `0x${string}` | undefined
): UseTokenGating {
  const contract = useContract()
  const [loading, setLoading] = useState(true)
  const [allow, setAllow] = useState<boolean>()
  const [deny, setDeny] = useState<boolean>()

  useEffect(() => {
    if (!contract || !wallet) return
    setLoading(true)
    contract
      .balanceOf(wallet)
      .then((res) => {
        const allow = res.toNumber() > 0 ? true : false
        setAllow(allow)
        setDeny(!allow)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [wallet, contract])

  return {
    loading,
    wallet,
    allow,
    deny
  }
}
