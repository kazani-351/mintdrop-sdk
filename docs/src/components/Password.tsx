import crypto from "crypto"
import useCookie from "react-use-cookie"

import SafeHydrate from "./SafeHydrate"

type Props = {
  children: any
}

const HASH = "965baf02a43ea2e65df6da485cf0bc31"

export default function Password(props: Props) {
  const { children } = props

  const [password, setPassword] = useCookie("__pw", "")

  const handlePasswordChange = async (pass: string) => {
    setPassword(pass)
  }

  const hash = crypto.createHash("md5").update(password).digest("hex")

  const isVerified = hash === HASH

  return (
    <SafeHydrate>
      {isVerified ? (
        <div className="w-full h-full">{children}</div>
      ) : (
        <div className="flex items-start justify-center w-screen h-screen">
          <div className="mt-[100px] rounded-button min-w-[250px] p-10 text-center space-y-10">
            <img src="/hero/title-text.svg" alt="" className="w-64" />
            <input
              ref={(input) => {
                input?.focus()
              }}
              type="text"
              name="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="px-5 py-2 border border-green-500 rounded placeholder-green text-green bg-slate-900 focus:ring-0 focus:outline-none rounded-button"
              placeholder="Enter password ..."
              autoFocus
            />
          </div>
        </div>
      )}
    </SafeHydrate>
  )
}
