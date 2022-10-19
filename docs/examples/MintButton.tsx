import { MintButton } from "@mintdrop/sdk"
import { SafeHydrate } from "next-tools"

type Props = {
  color?: string
  textColor?: string
  text?: string
}

const Button = ({ color = "#53DDB4", textColor = "#000", text }: Props) => {
  return (
    <SafeHydrate>
      <MintButton color={color} textColor={textColor} text={text} />
    </SafeHydrate>
  )
}

export default Button
