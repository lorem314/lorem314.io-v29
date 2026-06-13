import {
  useState,
  useImperativeHandle,
  ComponentProps,
  Children,
  forwardRef,
  useCallback,
} from "react"
import { ChevronDown, ChevronRight } from "./icons"

export const Details = forwardRef((props: ComponentProps<"details">, ref) => {
  const [isOpen, setIsOpen] = useState(!!props.open)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  useImperativeHandle(ref, () => ({ open, close }), [])

  const toggle = () => (isOpen ? close() : open())

  const childArray = Children.toArray(props.children)

  return (
    <details open={isOpen}>
      <summary
        onClick={(event) => {
          // 防止浏览器再次触发点击事件 从而导致状态和图标对不上
          event.preventDefault()
          toggle()
        }}
      >
        {isOpen ? (
          <ChevronDown onClick={toggle} />
        ) : (
          <ChevronRight onClick={toggle} />
        )}
        {childArray[0]}
      </summary>

      {childArray[1]}
    </details>
  )
})
