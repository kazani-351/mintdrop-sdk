import React, { ReactNode } from "react"
import { API, MintdropProvider } from "../src/index"

import "@testing-library/jest-dom"
import { renderHook, waitFor } from "@testing-library/react"
import { actConnect, setupClient, useWagmi } from "./helpers"
import * as mocks from "./mockData"
import nock from "nock"
import { Client } from "wagmi"

export async function wrappedAPI(): Promise<API> {
  const host = "http://localhost:4000"
  nock(host).get(`/drops/${mocks.DROP_ID}`).reply(200, mocks.drop)

  const client = setupClient({})

  const api = new API(mocks.DROP_ID, { host })
  await api.init(client as Client)

  return api
}

export async function wrapHook<T>(hook: () => T) {
  const wrapper = ({ children }: { children: ReactNode }) => {
    const client = setupClient({})

    nock("http://localhost:4000")
      .get(`/drops/${mocks.DROP_ID}`)
      .reply(200, mocks.drop)

    return (
      <MintdropProvider
        client={client as Client}
        drop={mocks.DROP_ID}
        host="http://localhost:4000"
      >
        {children}
      </MintdropProvider>
    )
  }

  const utils = renderHook(() => useWagmi(), {
    wrapper
  })

  await actConnect({ chainId: 5, utils })

  // wait to connect
  await waitFor(() =>
    expect(utils.result.current.account.isConnected).toBeTruthy()
  )

  const { result } = renderHook(hook, { wrapper })

  return result

  // await actDisconnect({ utils })
}
