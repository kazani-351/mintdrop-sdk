import type { Drop, Signature } from "./types"

let host = "https://api.mintdrop.xyz"

export function init(newHost: string) {
  host = newHost
}

export async function getDrop(id: string): Promise<Drop> {
  return fetch(host + "/drops/" + id).then((res) => res.json())
}

export async function getSignature(
  dropId: string,
  address: string
): Promise<Signature> {
  const url = host + "/drops/" + dropId + "/sig/" + address
  return fetch(url).then((res) => res.json())
}
