import { TreeList } from "./src/tree-list"
import { data } from "./src/data"

export default function App() {
  return (
    <div style={{ maxWidth: "24rem", margin: "2rem auto" }}>
      <TreeList data={data} />
    </div>
  )
}
