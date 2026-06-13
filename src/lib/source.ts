import { toFumadocsSource } from "fumadocs-mdx/runtime/server"
import { loader } from "fumadocs-core/source"
import { blogsCollections } from "fumadocs-mdx:collections/server"

export const blogsCollectionsSource = loader({
  baseUrl: "/blogs",
  source: toFumadocsSource(blogsCollections, []),
  slugs: (file) => {
    const path = file.path
    const segments = path.split("/").filter(Boolean)

    const processedSegments = segments
      .map((seg) => {
        if (seg.endsWith(".mdx") || seg === "index.mdx") {
          return null
        }
        return seg.replace(/\s+/g, "-")
      })
      .filter((seg): seg is string => seg !== null)

    return processedSegments
  },
})
