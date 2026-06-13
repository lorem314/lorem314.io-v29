import {
  defineCollections,
  frontmatterSchema,
  defineConfig,
  defineDocs,
} from "fumadocs-mdx/config"
import { remarkImage } from "fumadocs-core/mdx-plugins"
import {
  remarkCodeHike,
  recmaCodeHike,
  type CodeHikeConfig,
} from "codehike/mdx"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { z } from "zod"

import { countMdxStats } from "@/plugins/count-mdx-stats"

export const blogsCollections = defineCollections({
  type: "doc",
  dir: "content/blogs",
  schema: frontmatterSchema.extend({
    title: z.string().default("default title"),
    tags: z.array(z.string()).default(["default", "tags"]),
    createdAt: z.string().default("1996-01-01"),
    summary: z.string().default("default summary"),
    thumbnail: z.string().default("default thumbnail"),
    stats: z
      .object({
        wordCount: z.number(),
        codeBlockCount: z.number(),
        imageCount: z.number(),
        readingTimeMinutes: z.number(),
      })
      .optional(),
    cover: z
      .object({
        src: z.string().default("/images/blogs/default-blog-cover.webp"),
        width: z.number().default(1920),
        height: z.number().default(1080),
      })
      .default({
        src: "/images/blogs/default-blog-cover.webp",
        width: 1920,
        height: 1080,
      }),
    bili: z
      .object({
        src: z.string(),
        title: z.string().optional(),
      })
      .optional(),
  }),
})

const chConfig: CodeHikeConfig = {
  components: {
    code: "CodeHikePre",
  },
}

export default defineConfig({
  mdxOptions: {
    remarkPlugins: (v) => [
      ...v,
      remarkMath,
      [remarkImage, { useImport: false }],
      [remarkCodeHike, chConfig],
      countMdxStats,
    ],
    recmaPlugins: [[recmaCodeHike, chConfig]],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
})
