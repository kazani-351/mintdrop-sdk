import classNames from "classnames"

import Logo from "./Logo"

export default function PoweredBy({ className }: { className?: string }) {
  return (
    <div
      className={classNames(
        className,
        "flex items-center mx-auto space-x-1 justify-center"
      )}
    >
      <p className="text-[10px] text-gray-500 text-right">Powered by</p>
      <Logo className="h-4" />
    </div>
  )
}
