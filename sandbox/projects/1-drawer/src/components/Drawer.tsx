import { cloneElement, useEffect, useState, type ReactElement } from "react"
import { createPortal } from "react-dom"

export type Side = "top" | "bottom" | "left" | "right"

type DrawerProps = {
  open: boolean
  onClose: () => void
  side?: Side
  size?: string
  children:
    | React.ReactElement
    | (({
        handleCloseDrawer,
      }: {
        handleCloseDrawer?: () => void
      }) => React.ReactElement)
}

export default function Drawer(props: DrawerProps) {
  const { open, ...restProps } = props

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = ""
    }

    return () => {
      document.body.style.overflowY = ""
    }
  }, [open])

  return open ? <Portal {...restProps} /> : null
}

const Portal = ({
  onClose,
  side = "left",
  size = "320px",
  children,
}: Omit<DrawerProps, "open">) => {
  const [styles, setStyles] = useState({
    transform: getInitialTransform(side),
    opacity: 0,
  })

  useEffect(() => {
    setStyles({
      transform: "translate(0, 0)",
      opacity: 1,
    })
  }, [])

  const handleCloseDrawer = () => {
    setStyles({
      transform: getInitialTransform(side),
      opacity: 0,
    })
    setTimeout(() => {
      onClose()
    }, 150)
  }

  const positionProps = getPositionProps(side, size)

  return createPortal(
    <>
      <div
        style={{
          position: "fixed",
          inset: "0",
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(2px)",
          opacity: styles.opacity,
          transition: "opacity 150ms ease-in-out",
        }}
        onClick={handleCloseDrawer}
      />
      <div
        style={{
          position: "fixed",
          ...positionProps,
          backgroundColor: "white",
          transform: styles.transform,
          transition: "transform 150ms ease-in-out",
        }}
      >
        {typeof children === "function"
          ? children({ handleCloseDrawer })
          : cloneElement(
              children as ReactElement<{ handleCloseDrawer?: () => void }>,
              {
                handleCloseDrawer,
              },
            )}
      </div>
    </>,
    document.body,
  )
}

const getPositionProps = (side: Side, size: string) => {
  switch (side) {
    case "top":
    case "bottom":
      return { left: 0, right: 0, [side]: 0, height: size }
    case "right":
      return { top: 0, bottom: 0, right: 0, width: size }
    default:
      return { top: 0, bottom: 0, left: 0, width: size }
  }
}

const getInitialTransform = (side: Side) => {
  switch (side) {
    case "top":
      return "translate(0, -100%)"
    case "bottom":
      return "translate(0, 100%)"
    case "right":
      return "translate(100%, 0)"
    default:
      return "translate(-100%, 0)"
  }
}
