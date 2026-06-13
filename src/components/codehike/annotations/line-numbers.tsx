import { AnnotationHandler, InnerLine } from "codehike/code"

import { cn } from "@/lib/utils"

export const lineNumbers: AnnotationHandler = {
  name: "line-numbers",
  Line: (props) => {
    const minWidth = props.totalLines.toString().length + 2
    return (
      <div className="flex w-full">
        <span
          className={cn(
            "text-muted-foreground -translate-x-1 text-right select-none",
          )}
          style={{ minWidth: `${minWidth}ch` }}
        >
          {props.lineNumber}
        </span>
        <InnerLine merge={props} className="flex-1 pl-4" />
      </div>
    )
  },
}
