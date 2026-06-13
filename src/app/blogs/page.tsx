import type { Metadata } from "next"

import { blogsCollectionsSource } from "@/lib/source"
import Layout from "@/features/blog/components/layout"
import { ContextProvider } from "@/features/blog/components/context"
import { Blog, Tag } from "@/types"

const allBlogs = blogsCollectionsSource.getPages().map((page) => {
  return {
    id: page.path,
    url: page.url,
    title: page.data.title,
    tags: page.data.tags,
    createdAt: page.data.createdAt,
    summary: page.data.summary,
    thumbnail: page.data.thumbnail,
    stats: page.data.stats || {
      wordCount: 0,
      codeBlockCount: 0,
      imageCount: 0,
      readingTimeMinutes: 0,
    },
    cover: page.data.cover,
    bili: page.data.bili,
  }
})

export default function Page() {
  const allTags = collectAllTags(allBlogs)
  // console.log("allBlogs", allBlogs)
  return (
    <ContextProvider>
      <Layout allBlogs={allBlogs} allTags={allTags} />
    </ContextProvider>
  )
}

export const metadata: Metadata = {
  title: "博客 - lorem314.io",
}

const collectAllTags = (blogs: Blog[]) => {
  const allTags: Tag[] = []
  blogs.forEach((blog) => {
    blog.tags.forEach((tagName) => {
      const targetTag = allTags.find((tag) => tag.name === tagName)
      if (!targetTag) allTags.push({ name: tagName, count: 1 })
      else targetTag.count++
    })
  })
  return allTags
}
