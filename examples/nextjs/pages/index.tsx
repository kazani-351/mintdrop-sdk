import { useMinting } from "@mintdrop/sdk"
import type { NextPage } from "next"
import ConnectedAs from "../components/ConnectedAs"
import Counts from "../components/Counts"
import MintButton from "../components/MintButton"

const Home: NextPage = () => {
  const { isMinting, isSuccess, publicMint, signatureMint } = useMinting()

  const handleGroupMint = () => {
    signatureMint(1).catch(console.error)
  }

  const handlePublicMint = () => {
    publicMint(1).catch(console.error)
  }

  return (
    <div className="p-10">
      <main className="max-w-sm space-y-5">
        <Counts />
        <MintButton
          minting={isMinting}
          success={isSuccess}
          onPublicMint={handlePublicMint}
          onGroupMint={handleGroupMint}
        />
        <ConnectedAs />
      </main>
    </div>
  )
}

export default Home
