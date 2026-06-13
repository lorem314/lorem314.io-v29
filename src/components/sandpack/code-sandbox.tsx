import path from "node:path"
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackProviderProps,
} from "@codesandbox/sandpack-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { readFile, readFolder } from "./utils"
import { TitleBar, FileExplorerBar, CodeEditor } from "./code-sandbox.client"
import { CodeHikePre } from "../codehike/pre"
import { cn } from "@/lib/utils"

export type CodeSandboxProps = {
  /* custom props */

  // base folder, should be "/sandbox/project/[id]-[name]"
  // prefix for files
  folder: string

  // files that could be repalced
  // files mapping see below link in node or runtime folder
  // https://github.com/codesandbox/sandpack/tree/main/sandpack-react/src/templates
  files: Record<string, boolean | string>

  // sandbox title
  title?: string

  previewHeight?: string
  readOnly?: boolean

  /* props from SandpackProvider */
  className?: SandpackProviderProps["className"]
  template?: SandpackProviderProps["template"]
  options?: {
    visibleFiles?: string[]
    activeFile?: string
  }
}

export async function CodeSandbox({
  folder,
  files,
  title,
  previewHeight,
  readOnly,

  className,
  template,
  options,
}: CodeSandboxProps) {
  const sandpackFiles: Record<string, string> = await Promise.all(
    Object.entries(files).map(async ([filePath, input]) => {
      let content: string | undefined
      if (typeof input === "boolean") {
        if (input) {
          content = await readFile(path.join(folder, filePath))
        }
      } else {
        content = await readFile(path.join(folder, input))
      }
      return { content, path: filePath }
    }),
  ).then((files) => {
    return files
      .filter((file) => {
        return file.content ? true : false
      })
      .reduce((acc, { path, content }) => {
        return { ...acc, [path]: content }
      }, {})
  })

  return (
    <>
      {/* <pre className="overflow-auto">
        {JSON.stringify({ sandpackFiles }, undefined, 2)}
      </pre> */}

      <SandpackProvider
        options={{ ...options, initMode: "lazy" }}
        template={template}
        files={sandpackFiles}
      >
        <SandpackLayout
          className={cn(
            "text-foreground! border-border! block! rounded-lg! bg-transparent!",
            "my-4",
            readOnly ? "overflow-visible!" : "",
            className,
          )}
        >
          <TitleBar title={title} />

          <SandpackPreview
            style={{ height: previewHeight || undefined }}
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            // showRestartButton={false}
          />

          {readOnly ? (
            <>
              <Tabs
                className="overflow-y-visible"
                defaultValue={options?.activeFile}
              >
                <div className="border-t">
                  <TabsList variant="line">
                    {Object.keys(sandpackFiles).map((fileName) => {
                      const splitted = fileName.split("/")
                      return (
                        <TabsTrigger key={fileName} value={fileName}>
                          {splitted[splitted.length - 1]}
                        </TabsTrigger>
                      )
                    })}
                  </TabsList>
                </div>
                {Object.entries(sandpackFiles).map(
                  ([fileName, fileContent]) => {
                    const lang = fileName.split(".").at(-1) || "txt"
                    return (
                      <TabsContent
                        className="relative"
                        key={fileName}
                        value={fileName}
                      >
                        <CodeHikePre
                          className="my-0 grow rounded-t-none border-transparent"
                          codeblock={{
                            value: fileContent,
                            lang,
                            meta: `showLineNumbers showCopyButton`,
                          }}
                        />
                      </TabsContent>
                    )
                  },
                )}
              </Tabs>
            </>
          ) : (
            <>
              <FileExplorerBar />
              <CodeEditor />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </>
  )
}

/*
  let sandpackFiles: SandpackFiles = {}

  const folderAbsolutePath = path.join(process.cwd(), folder)
  const folderFiles = await readFolder(folderAbsolutePath)

  const mergedFiles = { ...folderFiles }

  sandpackFiles = await Promise.all(
    Object.entries(folderFiles).map(async ([relativePath, absolutePath]) => {
      return {
        relativePath,
        absolutePath,
        content: await readFile(path.join(folder, relativePath)),
      }
    }),
  ).then((files) => {
    return files.reduce((acc, { absolutePath, relativePath, content }) => {
      return { ...acc, [relativePath]: content }
    }, {})
  })
*/
