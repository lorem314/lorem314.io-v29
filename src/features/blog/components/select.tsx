"use client"

import React from "react"
import Image from "next/image"
import { ChevronDownIcon, Trash2Icon, XIcon, ChevronUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardAction,
} from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useContext } from "./context"
import { useDebounce } from "@/hooks/use-debounce"

import { Tag } from "@/types"

const LogicAndIcon = () => (
  <svg
    className="fill-current"
    width="800px"
    height="800px"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M105 105v302h151c148 0 148-302 0-302H105zm-89 46v18h71v-18H16zm368.8 96c.2 6 .2 12 0 18H496v-18H384.8zM16 343v18h71v-18H16z" />
  </svg>
)
const LogicOrIcon = () => (
  <svg
    className="fill-current"
    width="800px"
    height="800px"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M116.6 407c40-45.9 60.4-98.4 60.4-151 0-52.6-20.4-105.1-60.4-151H192c34.1 0 81.9 34 119.3 71.4 18.7 18.6 35.1 37.9 46.6 53.3 5.8 7.6 10.4 14.4 13.4 19.4 1.4 2.5 2.5 4.7 3.2 6.1.1.4.2.5.2.8 0 .3-.1.5-.2.9-.6 1.4-1.7 3.5-3.2 6-3 5.1-7.5 11.8-13.2 19.5-11.3 15.4-27.5 34.6-46.1 53.2C274.8 373 227.1 407 192 407zM16 361v-18h122.2c-3 6.1-6.3 12.1-9.9 18zm374.5-96c.2-.3.4-.7.5-1 1.1-2.4 2-4.4 2-8 0-3.6-1-5.6-2-8-.1-.3-.3-.7-.5-1H496v18zM16 169v-18h112.3c3.6 5.9 6.9 11.9 9.9 18z" />
  </svg>
)

export const Select = ({ allTags }: { allTags: Tag[] }) => {
  const [open, setOpen] = React.useState(false)
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  // const refSelectedTags = React.useRef<HTMLUListElement>(null)
  const refTagInput = React.useRef<HTMLInputElement>(null)
  const refOptions = React.useRef<HTMLUListElement>(null)

  const [searchTerm, setSearchTerm] = React.useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 250)

  const {
    selectedTags,
    onSelectTag,
    clearSelectedTags,
    isOrLogic,
    toggleIsOrLogic,
  } = useContext()

  React.useEffect(() => {
    const handleClickOutside = () => {
      setOpen(false)
    }
    window.addEventListener("click", handleClickOutside)
    return () => {
      window.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const handleClickTag =
    (tag: Tag) =>
    (
      event:
        | React.MouseEvent<HTMLLIElement>
        | React.MouseEvent<HTMLButtonElement>,
    ) => {
      if (!event.shiftKey) {
        setOpen(false)
      }
      onSelectTag(tag)(event)
    }

  const handleMouseEnterOption = React.useCallback(
    (index: number) => () => setHoveredIndex(index),
    [],
  )

  // const handleMouseLeaveOptions = React.useCallback(
  //   () => setHoveredIndex(null),
  //   [],
  // )

  const filteredTags = React.useMemo(
    () =>
      allTags.filter((tag) => {
        if (debouncedSearchTerm === "") return true
        const lowercasedDebouncedQuery = debouncedSearchTerm.toLocaleLowerCase()
        const lowercasedTagName = tag.name.toLocaleLowerCase()
        return lowercasedTagName.includes(lowercasedDebouncedQuery)
      }),
    [debouncedSearchTerm, allTags],
  )

  const actions = [
    {
      Icon: XIcon,
      onClick: () => setSearchTerm(""),
      tip: "删除搜索文本",
    },
    {
      Icon: isOrLogic ? LogicOrIcon : LogicAndIcon,
      onClick: () => toggleIsOrLogic(),
      tip: isOrLogic ? "与筛选" : "或筛选",
    },
    {
      Icon: Trash2Icon,
      onClick: () => clearSelectedTags(),
      tip: "清空所有标签",
    },
    {
      Icon: open ? ChevronUpIcon : ChevronDownIcon,
      onClick: () => setOpen((_) => !_),
      tip: open ? "关闭窗口" : "打开窗口",
    },
  ]

  return (
    <Card className="col-span-full overflow-visible lg:col-span-6">
      <CardHeader>
        <CardTitle>筛选</CardTitle>
      </CardHeader>

      <CardContent className="relative">
        <div className="border-input focus-within:border-ring focus-within:ring-ring/50 dark:bg-input/30 flex items-center rounded-lg border bg-transparent py-1 transition-colors focus-within:ring-3">
          {selectedTags.length !== 0 ? (
            <div className="no-scrollbar flex max-w-48 shrink-0 grow items-center gap-1.5 overflow-auto pl-1.5">
              {selectedTags.map((tag) => {
                return (
                  <Button key={tag.name} onClick={handleClickTag(tag)}>
                    {tag.name}
                  </Button>
                )
              })}
            </div>
          ) : null}

          <Input
            className="border-transparent p-0 pl-1.5 focus-visible:border-transparent focus-visible:ring-transparent dark:bg-transparent"
            type="text"
            ref={refTagInput}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onFocus={() => setOpen(true)}
            // onBlur={() => setOpen(false)}
            onClick={(event) => event.stopPropagation()}
          />

          <div className="flex items-center gap-1.5 px-1.5">
            {actions.map((action, index) => {
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      className="text-muted-foreground"
                      onClick={(event) => {
                        event.stopPropagation()
                        action.onClick()
                      }}
                    >
                      <action.Icon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">{action.tip}</TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </div>

        <ul
          className={cn(
            open ? "block" : "hidden",
            "bg-card absolute right-4 left-4 z-30 mt-2.5 overflow-auto border",
            "no-scrollbar max-h-52 rounded-lg shadow-xl",
          )}
          ref={refOptions}
          onClick={(event) => event.stopPropagation()}
          // 时间执行顺序 onMouseDown -> onBlur -> onMouseUp -> onClick
          // 防止其中的 li 在 onMouseDown 后 Input 失去焦点 导致 li 无法完成 onClick
          onMouseDown={(event) => event.preventDefault()}
          // onMouseLeave={handleMouseLeaveOptions}
        >
          {filteredTags.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>无结果</EmptyTitle>
                <EmptyDescription>没有符合条件的标签...</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            filteredTags.map((tag, index) => {
              const isHovered = index === hoveredIndex
              const isSelected = selectedTags.includes(tag)
              const parts = tag.name.split(new RegExp(`(${searchTerm})`, "gi"))
              return (
                <li
                  className={cn(
                    "flex h-8 items-center justify-between px-2.5",
                    isHovered ? "bg-accent" : "",
                    isSelected ? "bg-primary text-primary-foreground" : "",
                  )}
                  key={tag.name}
                  onMouseEnter={handleMouseEnterOption(index)}
                  onClick={handleClickTag(tag)}
                >
                  <span>
                    {parts.map((part, index) => {
                      return part.toLowerCase() === searchTerm.toLowerCase() ? (
                        <mark key={index} className="text-accent-foreground">
                          {part}
                        </mark>
                      ) : (
                        part
                      )
                    })}
                  </span>
                  <Badge variant={"secondary"}>{tag.count}</Badge>
                </li>
              )
            })
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
