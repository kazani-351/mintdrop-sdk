import { useBlockBeat } from "@mintdrop/sdk"

const UseBlockBeat = () => {
  const block = useBlockBeat()

  return <p>Block {block}</p>
}

export default UseBlockBeat
