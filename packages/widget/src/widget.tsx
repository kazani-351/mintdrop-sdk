import "./style.css"

import React from "react"
import ReactDOM from "react-dom"
import { Helmet } from "react-helmet"

import Debug from "./components/Debug"
import Providers from "./components/Providers"
import Widget from "./components/Widget"
import { init } from "./lib/api"

type Props = {
  el: HTMLDivElement
  apihost?: string
  drop: string
  debug?: boolean
}

if (typeof window !== "undefined") {
  const load = async (props: Props) => {
    const {
      apihost = process.env.API_HOST || "https://api.mintdrop.xyz",
      drop,
      debug = process.env.NODE_ENV === "development",
      el
    } = props

    const { address, abi, chainId, bytecode } = await init(apihost, drop)

    ReactDOM.render(
      <Providers>
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Helmet>
        <div style={{ width: 320 }}>
          <Widget
            address={address}
            chainId={chainId}
            abi={abi}
            bytecode={bytecode}
          />
        </div>
        {debug && <Debug />}
      </Providers>,
      el
    )
  }

  const container = document.createElement("div")
  container.id = "__mintdrop"
  document.currentScript.after(container)

  const attributes = document.currentScript
    .getAttributeNames()
    .reduce((acc, attr) => {
      if (!["async", "src"].includes(attr))
        acc[attr] = document.currentScript.getAttribute(attr)
      return acc
    }, {})

  load({
    el: container,
    ...attributes
  } as Props)

  // @ts-ignore
  window.mintdrop = (attrs) => {
    load({
      el: container,
      ...attributes,
      ...attrs
    })
  }
}
