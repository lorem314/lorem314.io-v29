"use client"

import * as React from "react"
import { toast } from "sonner"
import { CopyIcon, CopyCheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import { useCodeHikePreContext } from "../pre.client"
import { createPortal } from "react-dom"

export function CopyButton({
  className = "",
  text,
  hasTitle,
}: {
  className?: string
  text: string
  hasTitle: boolean
}) {
  const context = useCodeHikePreContext()

  const [open, setOpen] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = () => {
    try {
      navigator.clipboard.writeText(text)
      setCopied(true)
      setOpen(true)
      toast.success("代码已复制", { position: "top-right" })
      setTimeout(() => {
        setCopied(false)
      }, 1500)
    } catch (error) {
      toast.error("复制代码失败", { position: "top-right" })
    }
  }

  if (!mounted || !context.actionsAnchor.current) {
    return null
  }

  return createPortal(
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <Button
          className={cn("", className)}
          data-slot="copy-button"
          variant="outline"
          size="icon"
          onClick={handleClick}
        >
          {copied ? (
            <CopyCheckIcon className="text-green-600 dark:text-green-400" />
          ) : (
            <CopyIcon className="" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side={"left"}>
        {copied ? <p>已复制</p> : <p>复制代码</p>}
      </TooltipContent>
    </Tooltip>,
    context.actionsAnchor.current,
  )
}
