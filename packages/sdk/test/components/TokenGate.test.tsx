import React from "react"
import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import TokenGate from "../../src/components/TokenGate"
import { wrapper } from "../wrapper"
import nock from "nock"
import { DROP_ID } from "../mockData"
import { sleep } from "../helpers"

const wallet = "0x1234567890123456789012345678901234567890"

describe("TokenGate", () => {
  test("loads and displays token gated content", async () => {
    nock("http://localhost:4000")
      .get(`/drops/${DROP_ID}/gate/${wallet}`)
      .reply(200, {
        wallet,
        owner: true
      })

    render(<TokenGate wallet={wallet}>Token Gated!</TokenGate>, { wrapper })
    await waitFor(() => sleep(100))

    expect(await screen.queryByText("Not Allowed")).toBeNull()
    expect(await screen.queryByText("Token Gated!")).toBeDefined()
  })

  test("displays failure message when ", async () => {
    nock("http://localhost:4000")
      .get(`/drops/${DROP_ID}/gate/${wallet}`)
      .reply(200, {
        wallet,
        owner: false
      })

    render(<TokenGate wallet={wallet}>Token Gated!</TokenGate>, { wrapper })
    await waitFor(() => sleep(100))

    expect(await screen.queryByText("Not Allowed")).toBeDefined()
    expect(await screen.queryByText("Token Gated!")).toBeNull()
  })
})
