export default function Logo() {
  return (
    <>
      <img
        src="/docs/mintdrop-white.svg"
        height="25"
        width="100"
        alt="MintDrop"
        className="hidden dark:block"
      />
      <img
        src="/docs/mintdrop-black.svg"
        height="25"
        width="100"
        alt="MintDrop"
        className="dark:hidden"
      />
    </>
  )
}
