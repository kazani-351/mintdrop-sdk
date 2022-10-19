import fetch from "cross-fetch"
import { Contract } from "ethers"
import type { Drop, Signature } from "../types"
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

  async init(client: Client): Promise<void> {
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
  }

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
