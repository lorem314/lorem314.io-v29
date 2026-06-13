"use client"

import * as React from "react"
import { ListTreeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Drawer, useDrawer } from "@/components/custom-ui/drawer"
import { ClientPortal } from "@/components/custom-ui/client-portal"
import { cn } from "@/lib/utils"
import { throttle } from "@/lib/helper"

import { Actions } from "./actions"
import { TableOfContents } from "./table-of-contents"

import type { TableOfContents as TableOfContentsType } from "fumadocs-core/toc"

export function Layout({
  title,
  toc,
  children,
}: Readonly<{
  title: string
  toc: TableOfContentsType
  children: React.ReactNode
}>) {
  const refTocWrapper = React.useRef<HTMLDivElement>(null)

  const isRightDrawerAlwaysCollapsed = false

  const {
    isCollapsed: isRightDrawerCollapsed,
    isOpen: isRightDrawerOpen,
    handler: rightDrawerHandler,
  } = useDrawer({
    isAlwaysCollapsed: isRightDrawerAlwaysCollapsed,
    mediaQuery: "(max-width: 1279px)",
  })

  const showRightDrawerOpener =
    isRightDrawerAlwaysCollapsed || isRightDrawerCollapsed

  // React.useEffect(() => {
  //   const node = refTocWrapper.current
  //   if (!node || isRightDrawerAlwaysCollapsed) return

  //   const rect = node.getBoundingClientRect()
  //   node.style.height = `${window.innerHeight - rect.top - 10}px`

  //   const handleScroll = throttle(() => {
  //     if (!refTocWrapper.current) return
  //     const rect = node.getBoundingClientRect()
  //     if (rect.top > 80) {
  //       const height = window.innerHeight - rect.top - 16
  //       node.style.height = `${height}px`
  //     }
  //   }, 100)

  //   const handleResize = throttle(() => {
  //     if (!refTocWrapper.current) return
  //     const rect = node.getBoundingClientRect()
  //     const height = window.innerHeight - rect.top - 16
  //     node.style.height = `${height}px`
  //   }, 100)

  //   window.addEventListener("scroll", handleScroll, { passive: true })
  //   window.addEventListener("resize", handleResize, { passive: true })

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll)
  //     window.removeEventListener("resize", handleResize)
  //   }
  // }, [isRightDrawerCollapsed])

  return (
    <div
      className={cn(
        "relative mx-auto flex flex-col-reverse gap-6",
        "md:grid md:max-w-3xl md:grid-cols-[40px_minmax(60ch,1fr)]",
        "xl:max-w-7xl xl:grid-cols-[40px_minmax(60ch,1fr)_420px]",
      )}
    >
      {/*  */}

      <Actions />

      <div
        className={cn(
          "shrink-0 grow py-4",
          showRightDrawerOpener ? "grow-0" : "",
        )}
      >
        {children}
      </div>

      {showRightDrawerOpener ? (
        <>
          <ClientPortal target="right-drawer-anchor">
            <Button
              variant="outline"
              size="icon-lg"
              onClick={rightDrawerHandler.open}
            >
              <ListTreeIcon />
            </Button>
          </ClientPortal>
          <Drawer
            isOpen={isRightDrawerOpen}
            onClose={rightDrawerHandler.close}
            title="目录"
            side="right"
            size="420px"
          >
            {() => {
              return <TableOfContents title={title} toc={toc} />
            }}
          </Drawer>
        </>
      ) : (
        <div className="hidden xl:block xl:max-w-md xl:shrink-0 xl:grow-2">
          <div
            ref={refTocWrapper}
            className={cn(
              "sticky top-20 max-h-fit min-h-9.5 transition-[height]",
              "no-scrollbar overflow-auto rounded-lg border border-dashed",
              "bg-card/50",
              "max-h-[calc(100dvh-64px-16px-16px)]",
            )}
          >
            <TableOfContents title={title} toc={toc} />
          </div>
        </div>
      )}

      {/*  */}
    </div>
  )
}
