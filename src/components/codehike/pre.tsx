import { InnerLine, Pre, highlight } from "codehike/code"
import type { AnnotationHandler, BlockAnnotation, RawCode } from "codehike/code"
import { FileIcon } from "lucide-react"

import { callout } from "./annotations/callout"
import { CopyButton } from "./annotations/copy-button"
import {
  collapse,
  collapseTrigger,
  collapseContent,
} from "./annotations/collapse"
import { diff } from "./annotations/diff"
import { lineNumbers } from "./annotations/line-numbers"
import { mark } from "./annotations/mark"

import {
  CodeHikePreClient,
  ActionsAnchor,
  CodeHikePreProvider,
} from "./pre.client"
import { cn } from "@/lib/utils"

const line: AnnotationHandler = {
  name: "line",
  Line: (props) => {
    const showLineNumbers = props.data?.showLineNumbers || false
    return (
      <InnerLine
        merge={props}
        className={cn(showLineNumbers ? "" : "pr-10 pl-4")}
      />
    )
  },
}

const handlerMap: { [key: string]: AnnotationHandler[] } = {
  callout: [callout],
  mark: [mark],
  diff: [diff],
  // className: [className],
  // fold: [fold],
  // hover: [hover],
  collapse: [collapse, collapseTrigger, collapseContent],
  // tokenTransitions: [tokenTransitions],
  // focus: [focus],
}

type CodeHikePreProps = {
  className?: string
  // autoHeight?: boolean
  // maxHeight?: string
  codeblock: RawCode
}

export async function CodeHikePre({
  className,
  // autoHeight = true,
  // maxHeight,
  codeblock,
}: CodeHikePreProps) {
  const highlighted = await highlight(codeblock, "github-from-css")
  const parsedMeta = parseMeta(codeblock.meta)

  const hasTitle = parsedMeta.title.trim().length !== 0 ? true : false
  const handlers: AnnotationHandler[] = [line]

  const usedHandlerNames = parsedMeta.handlers.split(" ")
  usedHandlerNames.forEach((handlerName) => {
    const handler = handlerMap[handlerName] as AnnotationHandler[] | undefined
    if (handler) handlers.push(...handler)
  })

  if (parsedMeta.showLineNumbers) handlers.push(lineNumbers)

  const lineCount = highlighted.code.split("\n").length
  // totalLines is the length of lineCount as string, then plus 1
  // lineCount = 42, then totalLines = 42 -> 2 + 1 = 3
  const totalLines = lineCount.toString().length + 1
  const hasDiff = usedHandlerNames.includes("diff")
  const hasCollapse = usedHandlerNames.includes("collapse")
  const diffMinusAnnotationLineNumbers: number[] = []

  highlighted.annotations.forEach((annotation) => {
    if (annotation.name === "callout") {
      annotation.data = {
        totalLines,
        showLineNumbers: parsedMeta.showLineNumbers,
        hasDiff,
        hasCollapse,
      }
    }
    if (annotation.name === "diff" && annotation.query == "-") {
      diffMinusAnnotationLineNumbers.push(
        (annotation as BlockAnnotation).fromLineNumber,
      )
    }
    if (annotation.name === "line") {
      annotation.data = { showLineNumbers: parsedMeta.showLineNumbers }
    }
  })

  let textToCopy = ""
  if (parsedMeta.showCopyButton) {
    highlighted.code.split("\n").forEach((line, index) => {
      if (!diffMinusAnnotationLineNumbers.includes(index + 1)) {
        textToCopy += `${line}\n`
      }
    })
  }

  return (
    <CodeHikePreProvider>
      <CodeHikePreClient
        className={className}
        hasTitle={hasTitle}
        lineCount={lineCount}
      >
        {/* <pre>{JSON.stringify(highlighted.lang, undefined, 2)}</pre> */}

        <figure className={cn("group my-0! overflow-visible!")}>
          {parsedMeta.title ? (
            <figcaption
              className={cn(
                "text-(--ch-pre-title-foreground)",
                "bg-(--ch-pre-title-background)",
                "mt-0 rounded-t-lg border-b px-4 py-3",
                "flex items-center gap-2.5 font-mono text-sm",
              )}
            >
              {parsedMeta.title}
            </figcaption>
          ) : null}

          {parsedMeta.showCopyButton ? (
            <CopyButton text={textToCopy} hasTitle={hasTitle} />
          ) : null}

          <div className="flex">
            <Pre
              className={cn(
                "bg-card no-scrollbar overflow-auto rounded-lg",
                "font-fira grow py-2.5 pr-0 pl-0.5 leading-6",
                parsedMeta.title ? "rounded-t-none" : "",
              )}
              code={highlighted}
              handlers={handlers}
            />

            <ActionsAnchor hasTitle={hasTitle} />
          </div>
        </figure>
      </CodeHikePreClient>
    </CodeHikePreProvider>
  )
}

const parseMeta = (rawMeta: string) => {
  const iterator = rawMeta.matchAll(/([a-zA-Z]+)(?:="(.+?)")?/g)
  const meta: { [key: string]: string | boolean } = {}
  for (const match of iterator) {
    const key = match[1]
    const value = match[2]
    if (value === undefined) meta[key] = true
    else meta[key] = value
  }
  return { ...defaultMeta, ...meta }
}

const defaultMeta = {
  title: "",
  showLineNumbers: false,
  showCopyButton: false,
  handlers: "",
}
