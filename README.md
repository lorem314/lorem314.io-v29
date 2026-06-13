# lorem314.io

个人博客网站

## 技术栈

- React
- Next.js
- TyeScript
- Fumadocs
- CodeHike
- Tailwind CSS
- tRPC
- TanStack
- Elasticsearch
- Sandpack

<!--

## 备注

### type module

在 package.json 中添加了 `"type": "module"`

**原因**：

1. 在 CommonJS 环境下，export const client 会被转译成类似 exports.client = ...。
2. 如果你在另一个文件中使用 import { client }（ESM 语法）去调用一个被视为 CommonJS 的模块，有时会因为命名空间导出（Named Exports）的识别问题导致 SyntaxError，提示找不到该导出项。
3. 一旦声明了 "type": "module"，Node.js 会严格按照 ESM 规范处理，export 和 import 的对应关系就变得清晰明确，不再有歧义。

添加后，通过 pnpm run build:es-index 执行的脚本中的 import 导入可以被正确获取位置。

**弊端**：

1. 不能使用 require()：所有文件必须使用 import/export。
2. 配置文件限制：像 postcss.config.js 或 tailwind.config.js 如果使用了 module.exports，可能需要改名为 .cjs 后缀，或者改为 ESM 语法。

-->
