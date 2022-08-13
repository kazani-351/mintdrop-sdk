import classNames from "classnames"
import React from "react"

export default function Button({
  disabled,
  loading,
  onClick,
  children
}: {
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  children?: any
}) {
  return (
    <button
      disabled={disabled || loading}
      className={classNames(
        "bg-purple-700 rounded px-4 py-2 font-[700] focus:outline-none",
        disabled && "opacity-50"
      )}
      onClick={onClick}
    >
      {loading ? (
        <span className="block w-36 m-auto">
          <Spinner />
        </span>
      ) : (
        children
      )}
    </button>
  )
}

const Spinner = () => <span className="dots -ml-2" />
