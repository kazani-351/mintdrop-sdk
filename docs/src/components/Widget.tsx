import { MintdropProvider } from "@mintdrop/sdk"

// import { Widget as SDKWidget } from "@mintdrop/widget"
import DisableSSR from "./DisableSSR"

export default function Widget() {
  return (
    <DisableSSR>
      <MintdropProvider
        drop="cl7hw4ey60018ex4jwery74yt"
        host={process.env.NEXT_PUBLIC_API_URL || "https://api.mintdrop.xyz"}
      >
        {/* <SDKWidget /> */}
      </MintdropProvider>
    </DisableSSR>
  )
}

// Use this way to load via <script> tag.

// import { useEffect } from "react"

// export default function Widget({ className }: { className?: string }) {
//   useEffect(() => {
//     const script = document.createElement("script")

//     // script.src = "http://localhost:3001/dist/widget.dev.js"
//     script.src = "/docs/api/widget"
//     script.async = true
//     script.setAttribute("drop", "cl6s0aajb15890008tmcmwgedt48")
//     // script.setAttribute("apiHost", "http://localhost:4000")

//     const el = document.getElementById("widget")
//     el.append(script)

//     return () => {
//       script.remove()
//     }
//   }, [])

//   return <div id="widget" className={className} />
// }
