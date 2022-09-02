import lodash from "lodash"
import { useCallback, useEffect, useState } from "react"

type Exchange = "COINBASE"

type Opts = {
  exchange?: Exchange
  currency?: string
  ms?: number
}

type Prices = {
  ETH: number
  MATIC: number
}

type UsePrices = {
  loading: boolean
  currency: string
  prices: Prices
}

type CoinbaseResponse = {
  data: {
    currency: string
    rates: {
      [currency: string]: string
    }
  }
}

export function usePrices(opts: Opts = {}): UsePrices {
  const currency = "USD"
  const [loading, setLoading] = useState(false)
  const [prices, setPrices] = useState<Prices>()
  const ms = opts.ms || 60 * 1000

  const query = useCallback(() => {
    getCoinbasePrices(currency).then(setPrices)
  }, [currency])

  useEffect(() => {
    if (query) {
      query()
      const interval = setInterval(query, ms)
      return () => clearInterval(interval)
    }
  }, [query, ms])

  return {
    loading,
    currency,
    prices
  }
}

// @see https://developers.coinbase.com/api/v2#get-currencies
async function getCoinbasePrices(currency) {
  const prices = await fetch(
    `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
  )
    .then((res) => res.json())
    .then((res: CoinbaseResponse) => res.data.rates)
    .then((res) =>
      Object.entries(res).map(([key, val]: [string, string]) => [
        key,
        1 / parseFloat(val)
      ])
    )
    .then(Object.fromEntries)

  return lodash.pick(prices, ["ETH", "MATIC"])
}
