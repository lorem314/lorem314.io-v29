"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Minimize,
  Fullscreen,
  ListTree,
  ArrowLeft,
  ArrowUpToLine,
} from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function Actions() {
  const pathname = usePathname()
  const router = useRouter()

  const [isFullscreen, setIsFullscreen] = React.useState(false)

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) setIsFullscreen(true)
      else setIsFullscreen(false)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const enterFullscreen = () => {
    if (!document.documentElement.requestFullscreen) {
      alert("浏览器不支持全屏")
      return
    }
    document.documentElement.requestFullscreen()
  }

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  }

  const toTop = () => {
    document.documentElement.scrollTo(0, 0)
  }

  const goBack = () => {
    const splitted = pathname.split("/")
    const withoutLast = splitted.slice(0, splitted.length - 1)
    router.push(withoutLast.join("/"))
  }

  const actions = [
    { tip: "后退", Icon: ArrowLeft, onClick: goBack },
    { tip: "回到顶部", Icon: ArrowUpToLine, onClick: toTop },
    isFullscreen
      ? { tip: "退出全屏", Icon: Minimize, onClick: exitFullscreen }
      : { tip: "进入全屏", Icon: Fullscreen, onClick: enterFullscreen },
  ]

  return (
    <div
      className={cn(
        "bg-secondary/50 sticky bottom-4 z-30 rounded-lg backdrop-blur-xs",
        "border shadow-sm",
        "md:static md:border-0 md:bg-transparent md:shadow-none",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-around py-6",
          // "md:sticky md:top-20 md:flex-col md:gap-4",
          "md:hidden",
        )}
      >
        {actions.map((action, index) => {
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  className="size-12"
                  variant="outline"
                  size="icon-lg"
                  onClick={action.onClick}
                >
                  <action.Icon />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">{action.tip}</TooltipContent>
            </Tooltip>
          )
        })}
      </div>

      <div className="hidden h-full pt-4 md:block">
        <div
          className={cn(
            // "flex h-full items-center",
            "items-start gap-4 md:sticky md:top-20 md:flex md:flex-col",
            // "md:sticky md:top-20 md:flex-col md:gap-4",
          )}
        >
          {actions.map((action, index) => {
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Button
                    className="size-10"
                    variant="outline"
                    size="icon-lg"
                    onClick={action.onClick}
                  >
                    <action.Icon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{action.tip}</TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </div>
    </div>
  )
}
