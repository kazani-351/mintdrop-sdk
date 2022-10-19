import { useCallback, useEffect, useState } from "react"
import { useAccount, useBlockNumber, useSigner } from "wagmi"
import { ethToWei, weiToEth } from "../utils"
import { useAllowList } from "./useAllowList"
import { useContract } from "./useContract"
import { useDrop } from "./useDrop"
import { useSignature } from "./useSignature"

type PublicConfig = {
  mintPrice: number
  startTime: number
  endTime: number
}

export function useMinting({ timeout = 3000 } = { timeout: 3000 }) {
  const block = useBlockNumber()
  const contract = useContract()
  const { address } = useAccount()
  const drop = useDrop()
  const { data: signer } = useSigner({ chainId: drop?.chainId })
  const signature = useSignature()
  const group = useAllowList()

  const [config, setConfig] = useState<PublicConfig>()
  const [canPublicMint, setCanPublicMint] = useState(false)

  const [isMinting, setMinting] = useState(false)
  const [isSuccess, setSuccess] = useState(false)

  const canSignatureMint = !!signature?.valid
  const canMint = canSignatureMint || canPublicMint

  useEffect(() => {
    contract
      ?.publicMinting()
      .then((config) => {
        setConfig({
          mintPrice: weiToEth(config.mintPrice),
          startTime: config.startTime?.toNumber(),
          endTime: config.endTime?.toNumber()
        })
      })
      .catch(console.error)
  }, [contract])

  useEffect(() => {
    contract
      ?.canPublicMint(address, 1)
      .then(setCanPublicMint)
      .catch(() => setCanPublicMint(false)) // this function throws at the contract with reason
  }, [block, contract])

  const publicMint = useCallback(
    (count: number) => {
      console.log("publicMint", { signer })

      setMinting(true)
      const value = ethToWei(config.mintPrice * count)

      return contract
        .connect(signer)
        .publicMint(address, count, {
          value
        })
        .then((res) => res.wait())
        .then((receipt) => {
          console.log("RECEIPT", receipt)
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, timeout)

          return receipt
        })
        .finally(() => setMinting(false))
    },
    [contract, config, timeout]
  )

  const signatureMint = useCallback(
    (count: number) => {
      console.log("signatureMint", { signer })

      setMinting(true)
      const value = ethToWei(group.mintPrice * count)

      // Support the old groupMint function for now
      const func =
        contract.connect(signer).signatureMint ||
        contract.connect(signer).groupMint

      return func(address, signature.sig, count, {
        value
      })
        .then((res) => res.wait())
        .then((receipt) => {
          console.log("RECEIPT", receipt)
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, timeout)

          return receipt
        })
        .finally(() => setMinting(false))
    },
    [contract, group, signature, timeout]
  )

  return {
    isMinting,
    isSuccess,
    canSignatureMint,
    canPublicMint,
    canMint,
    config,
    signatureMint,
    publicMint
  }
}
