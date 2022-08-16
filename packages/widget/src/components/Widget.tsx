import moment from "moment"
import React, { useState } from "react"
import { useContract, useSigner } from "wagmi"

import ConnectedAs from "./ConnectedAs"
import Group from "./Group"
import MintButton from "./MintButton"
import PoweredBy from "./PoweredBy"

export default function Widget(props) {
  const { address, abi, chainId } = props
  const time = moment().subtract(5, "seconds")

  const [isMinting, setMinting] = useState(false)
  const [isSuccess, setSuccess] = useState(false)

  const { data: signer } = useSigner()
  const contract = useContract({
    addressOrName: address,
    contractInterface: abi,
    signerOrProvider: signer
  })

  const handleGroupMint = () => {
    console.log("@TODO - group minting")
  }

  const handlePublicMint = () => {
    setMinting(true)
    contract
      .publicMint(1, {
        gasLimit: 200_000,
        value: 0
      })
      .then((res) => res.wait())
      .then((receipt) => {
        console.log("Transaction Receipt", { receipt })
        setMinting(false)
        setSuccess(true)

        setTimeout(() => {
          setSuccess(false)
        }, 3000)
      })
      .catch(() => {
        setMinting(false)
      })
  }

  return (
    <div
      className="p-1.5 rounded-xl"
      style={{
        background:
          "linear-gradient(257.31deg, #99A9F8 -44.84%, #53DDB4 -9.81%, #28A0F0 53.57%, #8247E5 96.61%)"
      }}
    >
      <div className="p-5 bg-black rounded-lg">
        <div className="flex items-end justify-between">
          <p className="font-serif text-xl font-semibold text-white dark:text-white">
            Minting Schedule
          </p>
        </div>
        <div className="mt-8">
          <Group live={true} name="VIP Access-list" time={time} />
          <Group
            live={false}
            name="Public Minting"
            // time={moment().add(2, "hours").startOf("hour")}
            time={time}
            last
          />
        </div>

        <MintButton
          isMinting={isMinting}
          isSuccess={isSuccess}
          chainId={chainId}
          time={time}
          onPublicMint={handlePublicMint}
        />

        <ConnectedAs className="mt-3" />

        <PoweredBy className="w-auto mt-5" />
      </div>
    </div>
  )
}
