import Image from "next/image"
import { notFound } from "next/navigation"
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
  ItemMedia,
} from "@/components/ui/item"

import { blogsCollectionsSource } from "@/lib/source"
import { Layout } from "@/components/article/layout"
import { Body } from "@/components/article/body"
import { BreadcrumbNav } from "@/components/custom-ui/breadcrumb-nav"
import { GridOverlay } from "@/components/custom-ui/grid-overlay"
import { H1 } from "@/components/custom-ui/typography"
import { cn } from "@/lib/utils"

import { Blog } from "@/types"

export default async function Page(props: {
  params: Promise<{ title: string }>
}) {
  const params = await props.params
  const blogPost = blogsCollectionsSource.getPage([params.title])

  console.log("params.title", params.title)

  if (!blogPost || !blogPost.data.stats) return notFound()

  const cover = blogPost.data.cover

  return (
    <div>
      <div className="mx-auto my-4 max-w-7xl">
        <BreadcrumbNav
          className="px-3"
          items={[
            { title: "主页", href: "/" },
            { title: "博客", href: "/blogs" },
            { title: blogPost.data.title },
          ]}
        />
      </div>

      <header
        className={cn(
          "border-muted relative border shadow-sm",
          "mx-auto mb-6 max-w-7xl rounded-xl px-8 py-10",
        )}
      >
        <GridOverlay
          offsetX={`${Math.floor(Math.random() * 24)}px`}
          offsetY={`${Math.floor(Math.random() * 24)}px`}
        />

        <H1 className="mb-6">{blogPost.data.title}</H1>

        <div className="my-4 flex flex-wrap items-center gap-2.5">
          {blogPost.data.tags.map((tag, index) => {
            return (
              <Badge
                key={index}
                variant="outline"
                className="bg-card z-10 rounded-lg px-2.5 py-4 text-sm"
              >
                {tag}
              </Badge>
            )
          })}
        </div>

        <p className="text-muted-foreground">
          发布于
          {new Date(blogPost.data.createdAt).toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <Layout title={blogPost.data.title} toc={blogPost.data.toc}>
        <div
          className={cn(
            "prose prose-zinc dark:prose-invert mx-auto max-w-[72ch]",
          )}
        >
          <BiliSection bili={blogPost.data.bili} title={blogPost.data.title} />

          <Image
            className="rounded-lg"
            src={cover ? cover.src : "/images/blogs/default-blog-cover.webp"}
            alt="博客封面"
            width={cover ? cover.width : 1920}
            height={cover ? cover.height : 1080}
            loading="eager"
          />

          {blogPost.data?.summary ? (
            <p className="lead">{blogPost.data?.summary}</p>
          ) : null}

          <Body MDXContentBody={blogPost.data.body} />
        </div>
      </Layout>
    </div>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ title: string }>
}) {
  const params = await props.params
  const blogPost = blogsCollectionsSource.getPage([params.title])

  if (!blogPost) return { title: "404 - lorem314.io" }

  return {
    title: `${blogPost.data.title} - 博客 - lorem314.io`,
  }
}

const BiliSection = ({
  bili,
  title,
}: {
  bili?: { title?: string; src: string }
  title: string
}) => {
  if (!bili) return null

  return (
    <Item variant="outline" asChild className="not-prose">
      <a
        href={bili.src}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500"
      >
        <ItemMedia variant="icon">
          <svg
            fill="#000000"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
          >
            <title>Bilibili icon</title>
            <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z" />
          </svg>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{bili.title || title}</ItemTitle>
          <ItemDescription>在 Bilibili 上观看该博客的讲解视频</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ExternalLinkIcon className="size-4" />
        </ItemActions>
      </a>
    </Item>
  )
}
