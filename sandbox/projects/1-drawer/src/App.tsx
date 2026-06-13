import { useState } from "react"

import Drawer from "./components/Drawer"
import type { Side } from "./components/Drawer"

const sides = ["top", "right", "bottom", "left"]

export default function App() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [side, setSide] = useState<Side>("left")
  const [size, setSize] = useState(320)

  return (
    <main>
      <h1>用 React 和 TypeScript 编写抽屉组件</h1>

      <hr />

      <label htmlFor="side">
        Side{" "}
        <select
          name="side"
          id="side"
          defaultValue={"left"}
          value={side}
          onChange={(event) => {
            setSide(event.target.value as Side)
          }}
        >
          <option value="top">top</option>
          <option value="right">right</option>
          <option value="bottom">bottom</option>
          <option value="left">left</option>
        </select>
      </label>
      <br />
      <label htmlFor="size">
        size{" "}
        <input
          type="range"
          name="size"
          id="size"
          min={160}
          max={500}
          value={size}
          onChange={(event) => {
            const size = parseInt(event.target.value)
            setSize(size)
          }}
        />{" "}
        {size}
      </label>

      <hr />

      <button onClick={handleOpen}>打开抽屉</button>

      <Drawer open={open} onClose={handleClose} side={side} size={`${size}px`}>
        {({ handleCloseDrawer }) => {
          return (
            <div style={{ padding: "0 10px" }}>
              <p>抽屉内容</p>
              <button onClick={handleCloseDrawer}>关闭抽屉</button>
            </div>
          )
        }}
      </Drawer>
    </main>
  )
}
