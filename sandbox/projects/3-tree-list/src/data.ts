export type ItemType = { title: string; items?: ItemType[] }

export const data = {
  title: "现代前端开发技术栈",
  items: [
    {
      title: "JavaScript 框架与库",
      items: [
        {
          title: "React 生态",
          items: [
            { title: "Next.js (服务端渲染框架)" },
            { title: "Zustand (状态管理库)" },
            { title: "React Router (路由管理)" },
          ],
        },
        {
          title: "Vue 生态",
          items: [
            { title: "Nuxt.js (通用应用框架)" },
            { title: "Pinia (状态管理)" },
            { title: "Vue Router (路由)" },
          ],
        },
        {
          title: "Angular",
          items: [
            { title: "RxJS (异步编程库)" },
            { title: "Angular CLI (脚手架)" },
            { title: "NgRx (状态管理)" },
          ],
        },
      ],
    },
    {
      title: "前端工程化",
      items: [
        {
          title: "构建工具",
          items: [
            { title: "Vite (下一代前端工具)" },
            { title: "Webpack (模块打包器)" },
            { title: "Rollup (库打包工具)" },
          ],
        },
        {
          title: "包管理器",
          items: [{ title: "npm" }, { title: "pnpm" }, { title: "Yarn" }],
        },
        {
          title: "代码规范",
          items: [
            { title: "ESLint (静态检查)" },
            { title: "Prettier (代码格式化)" },
            { title: "Stylelint (样式检查)" },
          ],
        },
      ],
    },
    {
      title: "浏览器基础技术",
      items: [
        {
          title: "CSS 预处理器与架构",
          items: [
            { title: "Sass / SCSS" },
            { title: "Tailwind CSS (原子化类库)" },
            { title: "CSS Modules" },
          ],
        },
        {
          title: "JavaScript 运行环境",
          items: [
            { title: "V8 引擎" },
            { title: "Web Workers (多线程)" },
            { title: "WebAssembly (Wasm)" },
          ],
        },
        {
          title: "Web APIs",
          items: [
            { title: "DOM API" },
            { title: "Fetch API (网络请求)" },
            { title: "Canvas API (绘图)" },
          ],
        },
      ],
    },
  ],
}
