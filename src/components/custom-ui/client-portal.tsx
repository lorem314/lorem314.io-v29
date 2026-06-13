"use client"

import { ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface ClientPortalProps {
  children: ReactNode
  target?: string
}

export function ClientPortal({ children, target }: ClientPortalProps) {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    ref.current = target
      ? document.getElementById(target) || document.body
      : document.body

    setMounted(true)
  }, [])

  if (!mounted || !ref.current || typeof document === "undefined") {
    return <div style={{ display: "none" }}>{children}</div>
  }

  return createPortal(children, ref.current)
}
