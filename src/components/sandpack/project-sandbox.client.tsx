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
  type SandpackFiles,
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
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import { useGlobalContext } from "../layouts/context"
import type { ProjectSandboxProps } from "./project-sandbox"

const getEntry = (template: ProjectSandboxProps["template"]) => {
  switch (template) {
    case "react-ts":
      return "/src/index.tsx"
    default:
      return "/App"
  }
}

type ProjectSandboxClientProps = Omit<
  ProjectSandboxProps,
  "folderPath" | "files"
> & { files: SandpackFiles }

export function ProjectSandboxClient({
  files,
  title,
  previewHeight,

  template,
  readOnly,
  options,
}: ProjectSandboxClientProps) {
  const globalContext = useGlobalContext()

  const [open, setOpen] = React.useState(false)
  // const [showLineNumbers, setShowLineNumbers] = React.useState(false)

  return (
    <>
      {/* <pre className="overflow-auto">
        {JSON.stringify({ files }, undefined, 2)}
      </pre> */}
      <SandpackProvider
        files={files}
        theme={globalContext.theme}
        template={template}
        customSetup={{
          entry: template ? getEntry(template) : "react-ts",
        }}
        options={options}
      >
        <SandpackLayout
          className={cn(
            "text-foreground! my-4 block! bg-transparent!",
            "border-border! rounded-lg!",
          )}
        >
          {/*  */}

          <TitleBar title={title} />

          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            style={{ height: previewHeight || undefined }}
          />
          {/* <SandpackFileExplorer /> */}
          {/* <SandpackCodeEditor /> */}

          <FileExplorerBar open={open} setOpen={setOpen} />

          <div className="flex max-h-[60svh] min-h-72 items-stretch">
            {open ? <FileExplorer /> : null}

            <div className="grow overflow-auto">
              <SandpackCodeEditor
                className="h-full!"
                showTabs={false}
                showLineNumbers
                readOnly={readOnly}
              />
            </div>
          </div>

          {/*  */}
        </SandpackLayout>
      </SandpackProvider>
    </>
  )
}

const TitleBar = ({ title }: { title?: string }) => {
  const globalContext = useGlobalContext()

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
    <div className="flex items-center justify-between border-b px-4 py-2.5">
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

const FileExplorerBar = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { sandpack } = useSandpack()

  const setFileActive = (event: React.MouseEvent) => {
    const file = event.currentTarget.getAttribute("data-file")
    if (!file) return
    sandpack.setActiveFile(file)
  }

  const closeActiveFile = (event: React.MouseEvent) => {
    const file = event.currentTarget.getAttribute("data-file")
    if (!file) return
    sandpack.closeFile(file)
  }

  return (
    <div className="flex border-y">
      <Button
        variant="ghost"
        size="icon-lg"
        // disabled={sandpack.status === "running"}
        onClick={() => setOpen((_) => !_)}
      >
        <FolderTreeIcon />
      </Button>

      <Separator orientation="vertical" />

      <ul className="not-prose no-scrollbar flex items-stretch overflow-auto">
        {sandpack.visibleFiles.map((file) => {
          const splitted = file.split("/")
          const isActive = file === sandpack.activeFile

          return (
            <li
              key={file}
              className={cn(
                "text-muted-foreground flex items-center",
                isActive
                  ? "bg-accent text-accent-foreground border-primary border-b-2"
                  : "",
              )}
            >
              <Button
                variant="ghost"
                className={cn(
                  "pr-0 hover:bg-transparent",
                  "focus-visible:border-transparent focus-visible:ring-0",
                )}
                data-file={file}
                onClick={setFileActive}
              >
                {splitted[splitted.length - 1]}
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                data-file={file}
                onClick={closeActiveFile}
              >
                <XIcon />
              </Button>
            </li>
          )
        })}
      </ul>

      {/* <Separator orientation="vertical" />
      <div className="text-base">actions</div> */}
    </div>
  )
}

const FileExplorer = () => {
  const { sandpack } = useSandpack()
  const { theme } = useSandpackTheme()

  return (
    <div
      style={{ backgroundColor: theme.colors.surface1 }}
      className="w-fit shrink-0 overflow-auto border-r pr-4"
    >
      <SandpackFileExplorer className="h-full!" autoHiddenFiles />
    </div>
  )
}
