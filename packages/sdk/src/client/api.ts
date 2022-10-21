import { debounce } from "lodash"
import fetch from "cross-fetch"
import { BigNumber, Contract } from "ethers"
import type { Counts, Drop, Signature } from "../types"
import { Client } from "wagmi"

export enum ENV {
  TEST = "test",
  LIVE = "prod"
}

type APIOpts = {
  host?: string
  env?: ENV
}

export class API {
  private dropId: string
  private host = "https://api.mintdrop.com"
  private env: ENV = ENV.LIVE

  public drop: Drop
  public contract: Contract

  constructor(id: string, opts: APIOpts = {}) {
    this.dropId = id
    if (opts.host) this.host = opts.host
    if (opts.env) this.env = opts.env
  }

  async init(client: Client): Promise<API> {
    this.drop = await fetch(this.host + "/drops/" + this.dropId).then((res) =>
      res.json()
    )

    if (!this.drop) throw new Error("Drop not found " + this.dropId)

    if (this.drop.address) {
      const provider =
        typeof client.config.provider === "function"
          ? client.config.provider({ chainId: this.drop.chainId })
          : client.config.provider
      this.contract = new Contract(this.drop.address, this.drop.abi, provider)
    }

    return this
  }

  getCounts = debounce(
    (): Promise<Counts> => {
      if (!this.contract) return null

      // ethers.providers.JsonRpcBatchProvider
      const functions = [
        this.contract?.totalSupply().then((res: BigNumber) => res.toNumber()),
        this.contract?.maxSupply
          ? this.contract
              ?.maxSupply()
              .then((res: BigNumber) => res.toNumber())
              .then((supply: number) => {
                if (supply === 0) return Number.POSITIVE_INFINITY
                else return supply
              })
          : Number.POSITIVE_INFINITY
      ]

      return Promise.all(functions).then(
        ([totalSupply, maxSupply]: [number, number]) => {
          let remaining = maxSupply - totalSupply
          // This may or may not have been a problem before 🙈
          if (remaining < 0) remaining = 0

          return {
            maxSupply,
            totalSupply,
            remaining
          }
        }
      )
    },
    5000,
    { leading: true }
  )

  async getSignature(address: string): Promise<Signature> {
    const url = this.host + "/drops/" + this.dropId + "/sig/" + address
    return fetch(url).then((res) => res.json())
  }

  async tokenGate(wallet: string): Promise<boolean> {
    return this.contract
      ?.balanceOf(wallet)
      .then((res) => (res.toNumber() > 0 ? true : false))
      .catch(console.error)
  }
}
