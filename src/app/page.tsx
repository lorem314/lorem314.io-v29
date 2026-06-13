import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import { CodeWithTabs } from "@/components/codehike/code-with-tabs"
import { cn } from "@/lib/utils"
import { CodeViewer } from "@/components/codehike/code-viewer"
import { readFile } from "@/components/sandpack/utils"
import { ProjectSandbox } from "@/components/sandpack/project-sandbox"
import { ComponentPreview } from "@/components/sandpack/component-preview"
import { ExternalLink } from "@/components/custom-ui/external-link"
import { CodeSandbox } from "@/components/sandpack/code-sandbox"

export default async function Home() {
  return (
    <>
      <Card className="mx-auto max-w-3xl overflow-visible">
        <CardHeader>
          <CardTitle>lorem314.io</CardTitle>
        </CardHeader>
        <CardContent>
          <p>欢迎来到我的博客</p>

          <CodeSandbox
            template="react-ts"
            folder="/sandbox/projects/0-vite-test"
            files={{
              "/index.html": true,
              "/main.tsx": true,
              "/App.tsx": "/App.tsx",
            }}
            // readOnly
            options={{
              activeFile: "/App.tsx",
              // visibleFiles: ["/main.tsx"],
            }}
          />

          <CodeViewer
            file="/sandbox/codes/test2.tsx"
            title="代码示例fwesdfsdf"
            showCopyButton
            showLineNumbers
          />

          <CodeViewer
            file="/sandbox/codes/test2.tsx"
            title="代码示例fwesdfsdf"
            showCopyButton
            showLineNumbers
          />

          {/* <div className="flex h-[1200px] border">
            <div className="grow">sdfsdfsdsdf</div>
            <div className="relative bg-rose-100">
              <button className="sticky top-20 bg-green-200">btn</button>
            </div>
          </div> */}

          {/* 
        <CodeSandbox
        folder="/sandbox/projects/0-vite-test"
        files={{
          "/src/App.tsx": "/src/App.another.tsx",
          }}
          template="vite-react-ts"
          /> */}

          {/* <CodeSandbox
          folder="/sandbox/projects/0-test"
          files={{
            "/index.tsx": "/src/index.tsx",
            "/App.tsx": "/src/App.preview.tsx",
            }}
            /> */}

          {/* <ProjectSandbox
          template="react-ts"
          options={{
            activeFile: "/src/App.tsx",
            }}
            title="用 React 和 TypeScript 编写抽屉组件"
            files={{
              "/src/index.tsx": {
                path: "/sandbox/projects/1-drawer/src/index.tsx",
                },
                "/src/App.tsx": {
                  path: "/sandbox/projects/1-drawer/src/App.tsx",
                  },
                  "/src/components/Drawer.tsx": {
                    path: "/sandbox/projects/1-drawer/src/components/Drawer.tsx",
                    // hidden: true,
                    },
                    "/src/style.css": "/sandbox/projects/1-drawer/src/style.css",
                    }}
                    previewHeight="500px"
                    /> */}

          {/* <ProjectSandbox
          // folder="/sandbox/projects/1-tree-list"
          folder={{
            "/App.tsx": "/sandbox/projects/1-tree-list/App.tsx",
            "/styles.css": {
              path: "/sandbox/projects/1-tree-list/styles.css",
              },
              "/src/data.ts": "/sandbox/projects/1-tree-list/src/data.ts",
              "/src/details.tsx": "/sandbox/projects/1-tree-list/src/details.tsx",
              "/src/icons.tsx": "/sandbox/projects/1-tree-list/src/icons.tsx",
              "/src/tree-list.tsx":
              "/sandbox/projects/1-tree-list/src/tree-list.tsx",
              }}
              template="react-ts"
              title="可折叠树状列表组件"
              previewHeight="48rem"
              /> */}

          {/* <ComponentPreview
            template="react"
            folder="/sandbox/components/3-tree-list"
            file="/sandbox/components/0-test/src/tester.jsx"
            title="组件预览"
            meta={`showCopyButton`}
            /> */}

          {/* <CodeWithTabs
            showCopyButton
            tabs={[
              {
                lang: "jsx",
                meta: "Badge",
                value: await readFile("/sandbox/codes/test.tsx"),
                },
                {
                  lang: "tsx",
                  meta: "Avatar",
                  value: await readFile("/sandbox/codes/test2.tsx"),
                  },
                  ]}
                  /> */}
        </CardContent>
      </Card>
      {/* <div className="flex h-[1200px] border">
        <div className="grow">sdfsdfsdsdf</div>
        <div className="relative bg-rose-100">
          <button className="sticky top-16">btn</button>
        </div>
      </div> */}
    </>
  )
}
