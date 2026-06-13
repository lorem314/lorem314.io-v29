"use client"

import * as React from "react"
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackFileExplorer,
  SandpackCodeEditor,
  useSandpack,
  useSandpackTheme,
  useSandpackNavigation,
  type SandpackProviderProps,
} from "@codesandbox/sandpack-react"
import {
  PanelLeftOpenIcon,
  PanelLeftCloseIcon,
  RotateCwIcon,
  XIcon,
  FolderTreeIcon,
  ExternalLinkIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useGlobalContext } from "../layouts/context"

export function ComponentPreviewClient({
  template,
  files,
  title,
}: {
  template: SandpackProviderProps["template"]
  files: SandpackProviderProps["files"]
  title?: string
}) {
  const globalContext = useGlobalContext()

  return (
    <SandpackProvider
      theme={globalContext.theme}
      template={template}
      files={files}
    >
      <SandpackLayout
        className={cn(
          "block! rounded-b-none! bg-transparent!",
          "rounded-t-lg! border-(--ch-border-color)/50!",
        )}
      >
        <TitleBar title={title} />
        <SandpackPreview
          className="select-none"
          showRefreshButton={false}
          showOpenInCodeSandbox={false}
        />
      </SandpackLayout>
    </SandpackProvider>
  )
}

const TitleBar = ({ title }: { title?: string }) => {
  const { sandpack, listen } = useSandpack()
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  React.useEffect(() => {
    const unsubscribe = listen((data) => {
      if (data.type === "start") {
        setIsRefreshing(true)
      } else if (data.type === "done") {
        setIsRefreshing(false)
      }
    })

    return () => unsubscribe()
  }, [listen])

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-t-xl px-4 py-2.5",
        "border-b border-(--ch-border-color)/50",
        "bg-(--ch-pre-title-background) text-(--ch-pre-title-foreground)",
      )}
    >
      <div className="text-sm">{title}</div>
      <div className="flex items-center gap-2.5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon-sm"
              disabled={isRefreshing}
              onClick={() => sandpack.runSandpack()}
            >
              <RotateCwIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>刷新</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
