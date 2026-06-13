import { InlineAnnotation, AnnotationHandler, InnerLine } from "codehike/code"

export const callout: AnnotationHandler = {
  name: "callout",
  transform: (annotation: InlineAnnotation) => {
    const { name, query, lineNumber, fromColumn, toColumn, data } = annotation
    return {
      name,
      query,
      fromLineNumber: lineNumber,
      toLineNumber: lineNumber,
      data: { ...data, column: (fromColumn + toColumn) / 2 },
    }
  },
  Block: ({ annotation, children }) => {
    const { column, totalLines, showLineNumbers, hasDiff, hasCollapse } =
      annotation.data

    const left = [`${column}ch - 16px`]

    if (showLineNumbers) {
      left.push(`${totalLines + 1}ch`)
    }
    if (hasDiff) {
      left.push(`1ch + 8px`)
    }
    if (hasCollapse) {
      left.push(`20px`)
    }

    // console.log("base.join", base.join(" + "))
    return (
      <>
        {children}
        <div
          style={{ minWidth: `${column + 4}ch` }}
          className="bg-card text-foreground border-muted-foreground/50 relative my-1 ml-6 w-fit rounded border px-2 py-0.5 whitespace-break-spaces select-none"
          // ml-2 is original value
          // left has -24px -> -6 -> 2+6=8
        >
          <div
            style={{
              left: `calc(${left.join(" + ")})`,
            }}
            className="bg-card text-muted-foreground/50 absolute -top-px h-2 w-2 -translate-y-1/2 rotate-45 border-t border-l border-current"
          />
          {annotation.query}
        </div>
      </>
    )
  },
  // Line: (props) => {
  //   const width = props.totalLines.toString().length + 1
  //   return <InnerLine merge={props} style={{ marginLeft: `${width}ch` }} />
  // },
}
