import React from "react"
import { useAccount, useSignMessage } from "wagmi"

import Button from "./Button"
import ConnectWalletButton from "./ConnectWalletButton"

type Props = {
  loading?: boolean
  onSuccess: (message: string, signature: string) => void
  code: string
}

export default function SignMessageButton(props: Props) {
  const { loading, code, onSuccess } = props
  const { isConnected, address } = useAccount()
  const {
    // data,
    // error,
    isLoading,
    signMessage
  } = useSignMessage({
    onSuccess: (sig: string, { message }: any) => {
      onSuccess(message, sig)
    }
  })

  const handleSignature = () => {
    signMessage({
      message: `Hi, my name is ${address}. 
			
Please authenticate me for the g.money discord.

AuthCode: ${code}
			`
    })
  }

  if (!isConnected) {
    return <ConnectWalletButton />
  }

  return (
    <Button loading={isLoading || loading} onClick={handleSignature}>
      Sign Message
    </Button>
  )
}
