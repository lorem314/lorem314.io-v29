import type { Plugin } from "unified"
import { visit } from "unist-util-visit"
import type { Node } from "unist"
import type { VFile } from "vfile"

const cjkRegex =
  /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu

const readingSpeed = 400 // 可配置：中文博客常用 450–500

export const countMdxStats: Plugin = () => {
  return (tree: Node, file: VFile) => {
    let wordCount = 0
    let codeBlockCount = 0
    let imageCount = 0

    // console.log("tree", tree)

    visit(tree, "text", (node: any) => {
      const text = (node.value || "").trim()
      if (!text) return

      // 中文/日韩字符每个算 1
      const cjkCount = (text.match(cjkRegex) || []).length

      // 去掉 CJK 后统计英文单词（标点自动被 \b 忽略）
      const nonCjkText = text.replace(cjkRegex, " ")
      const englishWords = (nonCjkText.match(/\b[\p{L}\p{N}']+\b/gu) || [])
        .length

      wordCount += cjkCount + englishWords
    })

    visit(tree, "image", () => {
      imageCount++
    })

    visit(tree, "mdxJsxFlowElement", (node: any) => {
      // console.log("---- code with tabs ----")
      // console.log("node", node)
      // console.log("node.name", node.name)
      if (node.name === "Image") {
        // console.log("<Image /> detected!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        imageCount++
      } else if (node.name === "CodeHikePre") {
        codeBlockCount++
      } else if (node.name === "CodeWithTabs") {
        codeBlockCount++
        // console.log("---- code with tabs ----")
        // console.log("node", node)
        // console.log("node.children", node.children)
        // console.log("node.children[0].children", node.children[0].children)
      }

      // count sandpack sandbox component
    })

    const readingTimeMinutes = Math.ceil(wordCount / readingSpeed)

    const frontmatter = (file.data.frontmatter as any) || {}
    file.data.frontmatter = {
      ...frontmatter,
      stats: {
        wordCount,
        codeBlockCount,
        imageCount,
        readingTimeMinutes,
      },
    }
  }
}
