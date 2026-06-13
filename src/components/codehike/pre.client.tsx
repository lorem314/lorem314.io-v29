"use client"

import React from "react"
import { createPortal } from "react-dom"
import {
  ChevronDownIcon,
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
} from "lucide-react"

import { Button } from "../ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type CodeHikePreClientProps = {
  className?: string
  children: React.ReactNode
  hasTitle: boolean
  autoHeight?: boolean
  maxHeight?: string
  lineCount: number
}

export function CodeHikePreClient({
  className,
  children,
  hasTitle,
  autoHeight,
  maxHeight,
  lineCount,
}: CodeHikePreClientProps) {
  // const [isShowMore, setIsShowMore] = React.useState(false)
  const context = useCodeHikePreContext()

  const showButton = lineCount >= 24

  return (
    <>
      <div
        className={cn(
          "my-4 rounded-lg",
          "border border-(--ch-border-color)/50",
          showButton ? "max-h-144 overflow-hidden" : "",
          context.isShowMore ? "max-h-fit overflow-visible" : "",
          className,
        )}
      >
        {children}

        {showButton && !context.isShowMore ? (
          <div
            className={cn(
              "absolute right-0 bottom-4.25 left-0",
              "flex items-end justify-center",
              "mx-px h-24 rounded-b-lg py-2.5",
              "from-background bg-linear-to-t to-transparent",
            )}
          >
            <Button
              variant="outline"
              onClick={() => context.setIsShowMore(true)}
            >
              展开代码
              <ChevronsUpDownIcon />
            </Button>
          </div>
        ) : null}
      </div>

      {context.isShowMore && context.actionsAnchor.current
        ? createPortal(
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => context.setIsShowMore(false)}
                >
                  <ChevronsDownUpIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent side={"left"}>折叠代码</TooltipContent>
            </Tooltip>,
            context.actionsAnchor.current,
          )
        : null}
    </>
  )
}

type CodeHikePreContextProps = {
  actionsAnchor: React.RefObject<null | HTMLDivElement>
  isShowMore: boolean
  setIsShowMore: React.Dispatch<React.SetStateAction<boolean>>
}

const CodeHikePreContext = React.createContext<
  CodeHikePreContextProps | undefined
>(undefined)

export const CodeHikePreProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const actionsAnchorRef = React.useRef<HTMLDivElement | null>(null)
  const [isShowMore, setIsShowMore] = React.useState(false)

  return (
    <CodeHikePreContext.Provider
      value={{ actionsAnchor: actionsAnchorRef, isShowMore, setIsShowMore }}
    >
      {children}
    </CodeHikePreContext.Provider>
  )
}

export function useCodeHikePreContext() {
  const context = React.useContext(CodeHikePreContext)

  if (!context) {
    throw new Error(
      "context has to be used within <CodeHikePreProvider.Provider>",
    )
  }

  return context
}

export const ActionsAnchor = ({ hasTitle }: { hasTitle: boolean }) => {
  const context = useCodeHikePreContext()

  return (
    <div className="pb-4">
      <div
        ref={context.actionsAnchor}
        className={cn(
          "sticky flex -translate-x-4 flex-col gap-4 pb-4",
          hasTitle ? "translate-y-4" : "",
          context.isShowMore ? "top-20" : "top-0",
        )}
      ></div>
    </div>
  )
}
