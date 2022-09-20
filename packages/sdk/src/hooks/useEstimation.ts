import { Signer, utils, Wallet } from "ethers"
import { useCallback, useEffect, useState } from "react"
import { useProvider } from "wagmi"

import { useBlockBeat } from "./useBlockBeat"

type DataOrFn = string | ((Signer) => string)

type Estimate = {
  gas
  gasPrice
  wei
  eth
}

export function useEstimation(dataOrFn: DataOrFn, chainId?: number) {
  const provider = useProvider({ chainId })
  const block = useBlockBeat()
  const [estimate, setEstimate] = useState<Estimate>({
    gas: null,
    gasPrice: null,
    wei: null,
    eth: null
  })

  const buildData = useCallback(
    (provider) => {
      return typeof dataOrFn === "function" ? dataOrFn(provider) : dataOrFn
    },
    [dataOrFn]
  )

  useEffect(() => {
    const { address: from } = Wallet.createRandom()
    let data = buildData(provider)
    getEstimate(provider, {
      data,
      from
    })
      .then(setEstimate)
      .catch((err) => {
        console.error("useEstimation", err)
      })
  }, [block, provider, chainId, buildData])

  return estimate
}

async function getEstimate(provider, tx) {
  const gas = await provider
    .estimateGas(tx)
    .then((res) => res.toString())
    .then(Number)

  const gasPrice = await provider
    .getGasPrice()
    .then((res) => res.toString())
    .then(Number)

  const wei = gas * gasPrice
  const eth = parseFloat(utils.formatEther(wei.toString()))

  return {
    gas,
    gasPrice,
    wei,
    eth
  }
}
