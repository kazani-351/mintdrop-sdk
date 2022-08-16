import clsx from "clsx"
import Link from "next/link"
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react"

const styles = {
  primary:
    "rounded-full bg-green-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-green-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300/50 active:bg-green-500",
  secondary:
    "rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400"
}

export function Button(
  props: {
    variant?: string
    className?: string
    href?: string
  } & (
    | ButtonHTMLAttributes<HTMLButtonElement>
    | AnchorHTMLAttributes<HTMLAnchorElement>
  )
) {
  const { variant = "primary", className, href, ...restProps } = props

  return href ? (
    <Link
      href={href}
      className={clsx(styles[variant], className)}
      {...(restProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
    />
  ) : (
    <button
      className={clsx(styles[variant], className)}
      {...(restProps as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  )
}
