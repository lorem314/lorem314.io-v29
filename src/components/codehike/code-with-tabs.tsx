import React from "react"

import { Block, CodeBlock, parseProps } from "codehike/blocks"
import { Pre, RawCode, highlight } from "codehike/code"
import { z } from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { mark } from "./annotations/mark"
// import { diff } from "./annotations/diff"
import { CopyButton } from "./annotations/copy-button"
import { lineNumbers } from "./annotations/line-numbers"
import { cn } from "@/lib/utils"

const Schema = Block.extend({
  tabs: z.array(CodeBlock),
  showLineNumbers: z.boolean().optional().default(false),
  showCopyButton: z.boolean().optional().default(false),
})

type CodeWithTabsProps = z.infer<typeof Schema>

export async function CodeWithTabs(props: CodeWithTabsProps) {
  const { tabs } = parseProps(props, Schema) as { tabs: RawCode[] }
  return (
    <CodeTabs
      tabs={tabs}
      showCopyButton={props.showCopyButton}
      showLineNumbers={props.showLineNumbers}
    />
  )
}

async function CodeTabs(props: {
  tabs: RawCode[]
  showCopyButton: boolean
  showLineNumbers: boolean
}) {
  const { tabs } = props

  const highlighted = await Promise.all(
    tabs.map((tab) => highlight(tab, "github-from-css")),
  )

  const handlers = [mark]

  if (props.showLineNumbers) {
    handlers.push(lineNumbers)
  }

  return (
    <Tabs defaultValue={tabs[0]?.meta} className="rounded-md p-1">
      <TabsList
        className="text-muted-foreground rounded-t-md bg-transparent"
        variant="line"
      >
        {tabs.map((tab) => (
          <TabsTrigger key={tab.meta} value={tab.meta} className={cn("")}>
            {tab.meta}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab, i) => (
        <TabsContent key={tab.meta} value={tab.meta} className="relative mt-0">
          {props.showCopyButton ? (
            <CopyButton
              className="top-4"
              hasTitle={false}
              text={highlighted[i].code}
            />
          ) : null}

          <Pre
            code={highlighted[i]}
            handlers={handlers}
            className="bg-card no-scrollbar mt-2 mb-0 overflow-auto rounded-lg border border-(--ch-border-color)/50 px-1 py-2.5 text-sm leading-6"
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
