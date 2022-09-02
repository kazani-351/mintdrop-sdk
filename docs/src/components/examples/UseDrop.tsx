import { MintdropProvider, useDrop } from "@mintdrop/sdk"

const UseDrop = () => {
  const drop = useDrop()

  return <p>Block {JSON.stringify(drop)}</p>
}

export default mintdropHOC(UseDrop, {
  drop: "cl7geu12m0452x84jo8q0fgsw",
  host: "http://localhost:4000"
})

export function mintdropHOC(Comp, props) {
  const mintdropHOCRender = () => (
    <MintdropProvider {...props}>
      <Comp />
    </MintdropProvider>
  )

  return mintdropHOCRender
}
