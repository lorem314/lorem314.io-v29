import fs from "fs/promises"
import path from "path"

import { CodeHikePre } from "./pre"
import { cn } from "@/lib/utils"
import { readFile } from "../sandpack/utils"

type CodeViewerProps = {
  file: string
  meta?: string
  title?: string
  showLineNumbers?: boolean
  showCopyButton?: boolean
  handlers?: string
}

export async function CodeViewer(props: CodeViewerProps) {
  const value = await readFile(props.file)
  const extName = path.extname(props.file)
  const lang = extName.slice(1)

  const meta =
    props.meta ||
    cn(
      props.title ? `title="${props.title}"` : "",
      props.showLineNumbers ? "showLineNumbers" : "",
      props.showCopyButton ? "showCopyButton" : "",
      props.handlers ? `handlers="${props.handlers}"` : "",
    )

  return (
    <div className="relative border border-transparent">
      <CodeHikePre className="" codeblock={{ lang, meta, value }} />
    </div>
  )
}
