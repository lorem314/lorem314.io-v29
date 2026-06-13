"use client"

import * as React from "react"
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  useSandpack,
  // useSandpackNavigation,
  // useSandpackShell,
  type SandpackFiles,
  SandpackCodeEditor,
  useActiveCode,
} from "@codesandbox/sandpack-react"
import {
  PanelLeftOpenIcon,
  PanelLeftCloseIcon,
  RotateCwIcon,
  XIcon,
  FolderTreeIcon,
  ExternalLinkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "lucide-react"

import { CodeSandboxProps } from "./code-sandbox"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type CodeSandboxClientProps = Omit<CodeSandboxProps, "folder" | "files"> & {
  files: SandpackFiles
}

const CodeSandboxClient = (props: CodeSandboxClientProps) => {
  const { title, className, previewHeight, ...sandpackProps } = props

  return (
    <>
      <SandpackProvider {...sandpackProps}>
        <SandpackLayout
          className={cn(
            className,
            "text-foreground! border-muted! block! rounded-lg! bg-transparent!",
            "my-4",
          )}
        >
          {/*  */}

          <TitleBar title={title} />

          <SandpackPreview
            style={{ height: previewHeight || undefined }}
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            // showRestartButton={false}
          />

          <FileExplorerBar />

          <CodeEditor />
          {/*  */}
        </SandpackLayout>
      </SandpackProvider>
    </>
  )
}

export const TitleBar = ({ title }: { title?: string }) => {
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
    <div className="border-muted bg-secondary/50 flex items-center justify-between border-b px-4 py-2.5">
      <div className="text-sm">{title || "代码沙盒"}</div>
      <div>
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

export const FileExplorerBar = () => {
  const { sandpack } = useSandpack()

  const setFileActive = (event: React.MouseEvent) => {
    const file = event.currentTarget.getAttribute("data-file")
    if (!file || sandpack.activeFile === file) return
    sandpack.setActiveFile(file)
  }

  // const closeActiveFile = (event: React.MouseEvent) => {
  //   const file = event.currentTarget.getAttribute("data-file")
  //   if (!file) return
  //   sandpack.closeFile(file)
  // }

  return (
    <Tabs defaultValue={sandpack.activeFile} className="mt-4 mb-2 border-t">
      <TabsList variant="line">
        {sandpack.visibleFiles.map((file) => {
          const splitted = file.split("/")
          const isActive = file === sandpack.activeFile

          return (
            <TabsTrigger
              onClick={setFileActive}
              data-file={file}
              key={file}
              value={file}
            >
              {splitted}
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )

  return (
    <div className="border-muted bg-secondary/50 my-1 border-t border-b px-1">
      {/* <pre>
        {JSON.stringify({ visibleFiles: sandpack.visibleFiles }, undefined, 2)}
      </pre> */}
      {sandpack.visibleFiles.map((file) => {
        const splitted = file.split("/")
        const isActive = file === sandpack.activeFile

        return (
          <Button
            variant="ghost"
            key={file}
            className={cn(
              "rounded-none border-b-2 py-4",
              isActive
                ? "border-b-primary text-foreground border-x-transparent border-t-transparent"
                : "text-muted-foreground border-transparent",
            )}
            data-file={file}
            onClick={setFileActive}
          >
            {splitted[splitted.length - 1]}
          </Button>
        )
      })}
    </div>
  )
}

export const CodeEditor = () => {
  const { sandpack } = useSandpack()
  const { code } = useActiveCode()

  const lineCount = React.useMemo(() => {
    if (!code) return 0
    return code.split(/\r\n|\n|\r/).length
  }, [code])

  const [showButton, setShowButton] = React.useState(false)
  const [isShowMore, setIsShowMore] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(lineCount >= 24)
    }, 0)

    return () => clearTimeout(timer)
  }, [lineCount])

  React.useEffect(() => {
    const lineCount =
      sandpack.files[sandpack.activeFile].code.split("\r\n").length
    if (lineCount >= 24) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }, [sandpack.activeFile, sandpack.files])

  console.log("code line count ", lineCount)
  console.log("showButton ", showButton)

  return (
    <div className={cn("relative", "", isShowMore ? "" : "max-h-148")}>
      <SandpackCodeEditor
        className="font-fira! h-full! text-sm"
        showTabs={false}
        showLineNumbers
      />

      {isShowMore || showButton ? (
        <div
          className={cn(
            "mt-1 mb-4 flex justify-center",
            isShowMore
              ? "static"
              : "from-background sticky bottom-0 bg-linear-to-t to-transparent py-2.5",
          )}
        >
          <Button
            variant={"outline"}
            size={"lg"}
            onClick={() => {
              setIsShowMore((prevIsShowMore) => !prevIsShowMore)
            }}
          >
            {isShowMore ? <ChevronUpIcon /> : <ChevronDownIcon />}
            {isShowMore ? "折叠代码" : "展开代码"}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
