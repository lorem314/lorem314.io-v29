import fs from "fs/promises"
import path from "path"
import type {
  SandpackFile,
  SandpackFiles,
  SandpackProviderProps,
} from "@codesandbox/sandpack-react"

import { readFolder, mapFolderToSandpackFiles, readFile } from "./utils"
import { ProjectSandboxClient } from "./project-sandbox.client"
import type { RequireAtLeastOne } from "@/types"

// type BaseProps = {
//   title?: string
//   previewHeight?: string
//   template: SandpackProviderProps["template"]
//   readOnly?: boolean
// }

// type FolderOrFiles = {
//   files?: Record<string, { path: string; alias?: string }>
//   folder?: string
// }

// export type ProjectSandboxProps = RequireAtLeastOne<FolderOrFiles> & BaseProps

export type ProjectSandboxProps = {
  // custom props
  folderPath?: string
  files?: Record<
    string,
    | string
    | {
        path: string
        hidden?: boolean
        active?: boolean
        readonly?: boolean
      }
  >
  title?: string
  // syncTheme?: boolean
  previewHeight?: string

  // sandpack props
  template: SandpackProviderProps["template"]
  readOnly?: boolean
  options?: SandpackProviderProps["options"]
  // sharedFiles?: Record<string, string>
}

export async function ProjectSandbox(props: ProjectSandboxProps) {
  const { folderPath, ...restProps } = props

  let files: SandpackFiles

  if (!folderPath) {
    if (!props.files) return null

    const entries = await Promise.all(
      Object.entries(props.files).map(async ([fileName, input]) => {
        const code =
          typeof input === "string"
            ? await readFile(input)
            : await readFile(input.path)

        const options =
          typeof input === "string" ? {} : (({ path, ...rest }) => rest)(input)

        return [
          fileName,
          Object.keys(options).length > 0 ? { code, ...options } : code,
        ] as const
      }),
    )
    files = Object.fromEntries(entries) as Record<string, string | SandpackFile>
  } else {
    const folderContent = await readFolder(path.join(process.cwd(), folderPath))
    files = await mapFolderToSandpackFiles(folderContent)
  }

  return (
    <>
      <ProjectSandboxClient {...restProps} files={files} />
      {/* <pre className="overflow-auto">
        {JSON.stringify({ files }, undefined, 2)}
      </pre> */}
    </>
  )
}

// const getFiles = async ({ folder, files }: FolderOrFiles) => {
//   if (folder) {
//     // get files based on folder
//     const folderContent = await readFolder(path.join(process.cwd(), folder))
//     const sandpackFiles = await mapFolderToSandpackFiles(folderContent)
//     return sandpackFiles
//   }

//   if (files) {
//     // iterator files
//   }
// }

// files = await Promise.all(
//   Object.entries(props.files).map(async ([fileName, sandpackFile]) => {
//     if (typeof sandpackFile === "string") {
//       return { fileContent: await readFile(sandpackFile), fileName }
//     } else {
//       const { path, ...options } = sandpackFile
//       return { fileContent: await readFile(path), fileName, options }
//     }
//   }),
// ).then((fileContents) => {
//   return fileContents.reduce(
//     (files, { fileContent, fileName, options }) => {
//       return {
//         ...files,
//         [fileName]: { code: fileContent, ...options },
//       }
//     },
//     {},
//   )
// })
