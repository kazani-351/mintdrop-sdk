import fetch from "cross-fetch"

let apiHost

export function init(host, drop) {
  apiHost = host
  return get("/widget/" + drop)
}

export async function get(uri: string) {
  const url = `${apiHost || ""}${uri}`
  return fetch(url, {
    method: "GET",
    headers: {}
  }).then((res) => res.json())
}
