import { Signer, utils, Wallet } from "ethers"
import { useCallback, useEffect, useState } from "react"
import { useProvider } from "wagmi"

type DataOrFn = string | ((Signer) => string)

type Estimate = {
  gas
  gasPrice
  wei
  eth
}

export default function useEstimation(dataOrFn: DataOrFn, chainId?: number) {
  const provider = useProvider()
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
    getTxEstimate(provider, {
      data,
      from
    })
      .then(setEstimate)
      .catch((err) => {
        console.error("useEstimation", err)
      })
  }, [provider, chainId, buildData])

  return estimate
}

async function getTxEstimate(provider, tx) {
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
