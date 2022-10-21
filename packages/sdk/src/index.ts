import "./styles/style.css"

export * as wagmi from "wagmi"
export { chain } from "wagmi"

export {
  createClient,
  withMintdrop,
  default as MintdropProvider
} from "./providers/MintdropProvider"

export * from "./components"
export * from "./hooks"
export * from "./lib"
export * from "./utils"

export { API } from "./client/api"

export * from "wagmi/chains"

export * from "wagmi/providers/alchemy"
// export * from "wagmi/providers/coinbaseNode" // this doesn't work
export * from "wagmi/providers/infura"
export * from "wagmi/providers/jsonRpc"
export * from "wagmi/providers/public"
