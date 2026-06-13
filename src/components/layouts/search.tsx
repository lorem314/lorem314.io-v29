"use client"

import React from "react"
import Link from "next/link"
import { keepPreviousData } from "@tanstack/react-query"
import { AlertCircleIcon, SearchIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemHeader,
  ItemFooter,
  ItemSeparator,
  ItemGroup,
} from "@/components/ui/item"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

import { useDebounce } from "@/hooks/use-debounce"
import { trpc } from "@/trpc/client"

function SearchOuter() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        const isInputFocused =
          event.target instanceof HTMLElement &&
          ["INPUT", "TEXTAREA"].includes(event.target.tagName)

        if (isInputFocused) return

        event.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeydown)

    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="lg:w-64" variant="outline" size="lg">
          <SearchIcon />
          <span className="mr-auto hidden lg:inline">搜索</span>
          <KbdGroup className="hidden lg:block">
            <Kbd>Ctrl</Kbd>
            <span> + </span>
            <Kbd>/</Kbd>
          </KbdGroup>
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "flex h-svh max-w-svw flex-col rounded-none",
          "sm:max-w-svw",
          "lg:h-[calc(100vh-4rem)] lg:max-w-3xl lg:rounded-xl",
        )}
        showCloseButton={false}
        aria-describedby={undefined}
      >
        {/* <DialogHeader>
          <DialogTitle className="sr-only">全站搜索</DialogTitle>
        </DialogHeader> */}

        <SearchInner setOpen={setOpen} />

        <DialogFooter
          className={cn(
            "bg-accent border-t border-dashed py-2.5 lg:rounded-b-lg",
          )}
        >
          <div className="text-muted-foreground grow text-center text-xs">
            搜索功能由 <code>@elasticsearch</code> 实现
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const Search = React.memo(SearchOuter)

const SearchInner = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 450)

  const trimmedDebouncedQuery = debouncedQuery.trim()

  // const searchQuery = trpc.test.useQuery

  return (
    <>
      <DialogHeader
        className={cn(
          "-mx-4 flex-row items-center border-b border-dashed px-4 pb-4",
          "",
        )}
      >
        <DialogTitle className="sr-only">全站搜索</DialogTitle>
        <DialogClose asChild className="lg:hidden">
          <Button variant="outline" size="lg">
            关闭
          </Button>
        </DialogClose>
        <Input
          placeholder="全站搜索"
          type="search"
          className="h-10"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </DialogHeader>

      <div className="no-scrollbar grow overflow-y-auto">
        {/* <p className="text-muted-foreground my-4 text-center">
          全局搜索功能仍在开发中...
        </p> */}
        <ul className="flex flex-col gap-2.5">
          {Array(20)
            .fill(null)
            .map((_, index) => {
              return (
                <li key={index} className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias corrupti soluta commodi quae? Aperiam accusamus
                  adipisci, earum quae quisquam, tempore dicta non, saepe
                  officia voluptate enim labore vel ut molestiae repellendus
                  repellat fugit soluta. Ipsam est odio quis, quasi omnis
                  architecto soluta?
                </li>
              )
            })}
        </ul>
      </div>
    </>
  )
}
