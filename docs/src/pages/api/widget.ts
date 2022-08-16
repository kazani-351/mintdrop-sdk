// Eventually we'll have a CDN to deliver this from but for now let's just use this hack
import fs from "fs"

const src = fs.readFileSync("node_modules/@mintdrop/widget/dist/widget.js")

export default function widget(req, reply) {
  reply.setHeader("Content-Type", "application/javascript")
  reply.status(200).send(src)
}
