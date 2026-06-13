"use client"

import * as React from "react"
import { TagsIcon, LayoutGridIcon, ListIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardAction,
} from "@/components/ui/card"
import { Drawer, useDrawer } from "@/components/custom-ui/drawer"
import { ClientPortal } from "@/components/custom-ui/client-portal"
import { cn } from "@/lib/utils"

import { Search } from "./search"
import { Select } from "./select"
import { List } from "./list"
import { AllTags } from "./all-tags"
import { useContext } from "./context"
import type { Blog, Tag } from "@/types"

export default function Layout({
  allTags,
  allBlogs,
  children,
}: {
  allTags: Tag[]
  allBlogs: Blog[]
  children?: React.ReactNode
}) {
  const { searchTerm, selectedTags, currentPage, isOrLogic } = useContext()

  const isRightDrawerAlwaysCollapsed = true

  const {
    isCollapsed: isRightDrawerCollapsed,
    isOpen: isRightDrawerOpen,
    handler: rightDrawerHandler,
  } = useDrawer({
    isAlwaysCollapsed: isRightDrawerAlwaysCollapsed,
    mediaQuery: "(max-width: 1536px)",
  })

  const showRightDrawerOpener =
    isRightDrawerAlwaysCollapsed || isRightDrawerCollapsed

  const query = { searchTerm, selectedTags, isOrLogic, currentPage }
  const deferredQuery = React.useDeferredValue(query)

  // const isStale =
  //   searchTerm !== deferredQuery.searchTerm ||
  //   currentPage !== deferredQuery.currentPage ||
  //   JSON.stringify(selectedTags) !== JSON.stringify(deferredQuery.selectedTags)

  return (
    <div className="mx-auto grid max-w-screen-2xl grid-cols-12 gap-6">
      <Search />

      <Select allTags={allTags} />

      <Card
        className={cn(
          "col-span-full 2xl:col-span-8",
          isRightDrawerAlwaysCollapsed ? "2xl:col-span-full" : "",
        )}
      >
        <CardHeader>
          <CardTitle>博客</CardTitle>
        </CardHeader>
        <CardContent className="@container">
          <List items={allBlogs} query={deferredQuery} />
        </CardContent>
      </Card>

      {showRightDrawerOpener ? (
        <>
          <ClientPortal target="right-drawer-anchor">
            <Button
              variant="outline"
              size="icon-lg"
              onClick={rightDrawerHandler.open}
            >
              <TagsIcon />
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
              return (
                <div className="p-2.5">
                  <AllTags allTags={allTags} />
                </div>
              )
            }}
          </Drawer>
        </>
      ) : (
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>所有标签</CardTitle>
          </CardHeader>
          <CardContent>
            <AllTags allTags={allTags} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
