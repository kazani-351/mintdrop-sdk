import { etherscanAddressURL, useContract, useDrop } from "@mintdrop/sdk"
import { SafeHydrate } from "next-tools"
import { useEffect, useState } from "react"

function UseContract() {
  const drop = useDrop()
  const contract = useContract()
  const [name, setName] = useState()

  useEffect(() => {
    contract?.name().then(setName)
  }, [contract])

  return (
    <SafeHydrate>
      <h1>
        Contract:{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href={etherscanAddressURL(contract?.address, drop?.chainId)}
        >
          {contract?.address}
        </a>
      </h1>

      <p>Name: {name}</p>
    </SafeHydrate>
  )
}

export default UseContract
