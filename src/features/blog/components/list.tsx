"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  CalendarIcon,
  ClockIcon,
  FileTextIcon,
  Code2Icon,
  ImageIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemGroup,
  ItemHeader,
  ItemFooter,
} from "@/components/ui/item"
import { Paginator } from "@/components/custom-ui/paginator"
import { cn } from "@/lib/utils"
import { useContext } from "./context"
import { getRelativeTime } from "@/lib/formatter"
import { fetchBlogs } from "../data"
import { Blog, Tag } from "@/types"

const imageSrc =
  "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop"

export const List = ({
  items,
  query,
}: {
  items: Blog[]
  query: {
    searchTerm: string
    selectedTags: Tag[]
    isOrLogic: boolean
    currentPage: number
  }
}) => {
  const { pageSize, setCurrentPage } = useContext()

  const { results, totalPage } = React.use<{
    results: Blog[]
    totalPage: number
  }>(
    fetchBlogs(items, {
      searchTerm: query.searchTerm,
      selectedTags: query.selectedTags,
      isOrLogic: query.isOrLogic,
      currentPage: query.currentPage,
      pageSize,
    }),
  )

  if (results.length === 0) {
    return <NoResult />
  }

  return (
    <>
      <CardView items={results} />
      <Paginator
        className="mt-6"
        currentPage={query.currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
      />
    </>
  )
}

const ListView = () => {}

const CardView = ({ items }: { items: Blog[] }) => {
  return (
    <div className="grid grid-cols-1 gap-6 @lg:grid-cols-2 @4xl:grid-cols-3 @7xl:grid-cols-4">
      {items.map((item, index) => {
        return (
          <Link key={item.id} href={item.url} className="hover:no-underline">
            <article
              className={cn(
                "group overflow-hidden rounded-xl border",
                "shadow hover:shadow-xl",
                // "dark:hover:border-(--link-color)",
                "transition-shadow duration-300",
                // "dark:transition-[border]",
              )}
            >
              <header className="relative aspect-video overflow-hidden">
                <Image
                  // src={imageSrc}
                  src={
                    item.cover
                      ? item.cover.src
                      : "/images/blogs/default-blog-cover.webp"
                  }
                  alt={"alt"}
                  width={item.cover ? item.cover.width : 1920}
                  height={item.cover ? item.cover.height : 1080}
                  loading="eager"
                  className={cn(
                    "aspect-video w-full object-cover",
                    "transition-transform duration-500",
                    "group-hover:scale-105",
                  )}
                />
              </header>
              <section className="flex flex-col gap-2.5 p-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  {item.tags.map((tag, index) => {
                    return (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    )
                  })}
                </div>
                <h2 className="line-clamp-2 min-h-[2lh] font-bold text-balance group-hover:text-(--link-color)">
                  {item.title}
                </h2>
                <p className="text-muted-foreground line-clamp-4 min-h-[4lh] leading-relaxed">
                  {item.summary}
                </p>
                <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <CalendarIcon className="size-3.5" />
                  <span>
                    发布于
                    <time dateTime={item.createdAt}>
                      {getRelativeTime(new Date(item.createdAt))}
                    </time>
                  </span>
                </div>
              </section>
              <footer className="border-border border-t border-dashed px-4 py-3">
                <Stats
                  wordCount={item.stats.wordCount}
                  codeBlockCount={item.stats.codeBlockCount}
                  imageCount={item.stats.imageCount}
                  readingTimeMinutes={item.stats.readingTimeMinutes}
                />
              </footer>
            </article>
          </Link>
        )
      })}
    </div>
  )
}

const Stats = ({
  wordCount,
  imageCount,
  codeBlockCount,
  readingTimeMinutes,
  compact,
}: {
  wordCount: number
  codeBlockCount: number
  imageCount: number
  readingTimeMinutes: number
  compact?: boolean
}) => {
  const stats = [
    {
      icon: FileTextIcon,
      label: `约${wordCount.toLocaleString("zh")}字`,
    },
    codeBlockCount !== 0
      ? { icon: Code2Icon, label: `${codeBlockCount}代码块` }
      : null,
    imageCount !== 0 ? { icon: ImageIcon, label: `${imageCount}图片` } : null,
    {
      icon: ClockIcon,
      label: `${readingTimeMinutes}分钟`,
    },
  ].filter((item) => item !== null)

  return (
    <div
      className={`flex flex-wrap items-center ${compact ? "gap-2.5" : "gap-3"}`}
    >
      {stats.map((stat) => (
        <span
          key={stat.label}
          className={`text-muted-foreground inline-flex items-center gap-1 font-mono ${
            compact ? "text-[11px]" : "text-xs"
          }`}
        >
          <stat.icon className={compact ? "size-3" : "size-3.5"} />
          {stat.label}
        </span>
      ))}
    </div>
  )
}

const NoResult = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>无结果</EmptyTitle>
        <EmptyDescription>没有符合查询的文章...</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
