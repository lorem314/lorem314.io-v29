import fs from "fs/promises"
import path from "path"
import type { SandpackProviderProps } from "@codesandbox/sandpack-react"

import { readFile, readFolder, mapFolderToSandpackFiles } from "./utils"
import { ComponentPreviewClient } from "./component-preview.client"
import { CodeHikePre } from "../codehike/pre"
import { cn } from "@/lib/utils"

export type ComponentPreviewProps = {
  // sandpack props
  template?: SandpackProviderProps["template"]

  // custom props
  folder: string
  file: string
  title?: string
  // autoHeight?: boolean
  // maxHeight?: string

  // code hike pre props
  meta?: string
  showLineNumbers?: boolean
  showCopyButton?: boolean
  handlers?: string
}

export async function ComponentPreview(props: ComponentPreviewProps) {
  const folder = await readFolder(path.join(process.cwd(), props.folder))
  const files = await mapFolderToSandpackFiles(folder)

  const value = await readFile(props.file)
  const extName = path.extname(props.file)
  const lang = extName.slice(1)

  const meta =
    props.meta ||
    cn(
      // props.title ? `title="${props.title}"` : "",
      props.showLineNumbers ? "showLineNumbers" : "",
      props.showCopyButton ? "showCopyButton" : "",
      props.handlers ? `handlers="${props.handlers}"` : "",
    )

  return (
    <div className="my-4">
      <ComponentPreviewClient
        template={props.template}
        files={files}
        title={props.title}
      />
      <CodeHikePre
        className="rounded-t-none border-t-0"
        codeblock={{ lang, meta, value }}
        // autoHeight={props.autoHeight === undefined ? true : props.autoHeight}
        // maxHeight={props.maxHeight}
      />
    </div>
  )
}
