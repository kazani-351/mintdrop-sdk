import { it, describe, expect, beforeEach } from "vitest"
import drop, { DROP_ID } from "../mocks/drop"
import nock from "nock"
import { wrappedAPI } from "../wrapper"

describe("tokenGate", () => {
  beforeEach(() => {
    nock("http://localhost:4000").get(`/drops/${DROP_ID}`).reply(200, drop)
  })

  it("should token gate true", async function () {
    const wallet = "0xE0215419ACEc1D54a588864FAc410b28618333B9"

    const api = await wrappedAPI()
    const owns = await api.tokenGate(wallet)
    expect(owns).to.eq(true)
  })

  it("should token gate false", async function () {
    const wallet = "0x1234567889123456788912345678891234567889"

    const api = await wrappedAPI()
    const owns = await api.tokenGate(wallet)
    expect(owns).to.eq(false)
  })
})
