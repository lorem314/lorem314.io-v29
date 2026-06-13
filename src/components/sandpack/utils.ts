import { SandpackFile, SandpackFiles } from "@codesandbox/sandpack-react"
import fs from "fs/promises"
import path from "path"

export async function readFile(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath)
  const value = await fs.readFile(fullPath, "utf-8")
  return value.trim()
}

export async function readFolder(
  folderPath: string,
  currentPath: string = "/",
  files: Record<string, string> = {},
) {
  const items = await fs.readdir(folderPath, { withFileTypes: true })

  for (const item of items) {
    const fullPath = path.join(folderPath, item.name)
    if (item.isDirectory()) {
      await readFolder(fullPath, `${currentPath}${item.name}/`, files)
    } else {
      files[`${currentPath}${item.name}`] = fullPath
    }
  }

  return files
}

export async function mapFolderToSandpackFiles(
  folder: Record<string, string>,
): Promise<SandpackFiles> {
  const files: SandpackFiles = {}

  for (const fileName of Object.keys(folder)) {
    const filePath = folder[fileName]
    const fileContent = await fs.readFile(filePath, "utf-8")
    files[fileName] = fileContent
  }

  return files
}
