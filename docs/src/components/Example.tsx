import UseBlockBeat from "./examples/UseBlockBeat"
import UseDrop from "./examples/UseDrop"

export default function Example(props) {
  const { name } = props

  return (
    <div className="px-5 border border-gray-200 dark:border-gray-700 rounded-xl">
      <ExampleImpl name={name} />
    </div>
  )
}

function ExampleImpl({ name }) {
  switch (name) {
    case "useBlockBeat":
      return <UseBlockBeat />
    case "useDrop":
      return <UseDrop />
    default:
      throw new Error("Unknown example " + name)
  }
}
