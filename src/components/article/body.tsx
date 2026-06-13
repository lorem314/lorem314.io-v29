import Image from "next/image"
import type { MDXContent } from "mdx/types"

import {
  Img,
  H2,
  H3,
  H4,
  H5,
  H6,
  InlineCode,
  P,
  Details,
  BlockQuote,
} from "../custom-ui/typography"

import { CodeHikePre } from "../codehike/pre"
import { CodeWithTabs } from "../codehike/code-with-tabs"
import { ProjectSandbox } from "../sandpack/project-sandbox"
import { ComponentPreview } from "../sandpack/component-preview"

export function Body({ MDXContentBody }: { MDXContentBody: MDXContent }) {
  return (
    <MDXContentBody
      components={{
        // typography
        h2: H2,
        h3: H3,
        h4: H4,
        p: P,
        code: InlineCode,
        blockquote: BlockQuote,
        // code hike
        CodeHikePre,
        CodeWithTabs,
        ProjectSandbox,
        ComponentPreview,
      }}
    />
  )
}
