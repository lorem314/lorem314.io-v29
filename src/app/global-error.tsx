// app/global-error.tsx
"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // 提取错误标识，安全处理 error 为空的情况
  const errorDigest = error?.digest
  // 提取错误具体信息（开发阶段或调试时可以用，生产环境一般会被 Next.js 隐藏）
  const errorMessage = error?.message

  return (
    <html lang="zh" className="h-full">
      <body className="h-full bg-slate-50 font-sans text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
          <div className="w-full max-w-md">
            {/* 简洁的错误状态码/标识 */}
            <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
              Application Error
            </p>

            {/* 核心标题 */}
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              抱歉，网页遇到了内部错误
            </h1>

            {/* 客观叙述的文案 */}
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              由于未知的运行时错误，页面暂时无法正常显示。您可以尝试刷新或返回首页。
            </p>

            {/* 调试信息区块：只要有 digest 或 message 任何一个就显示，方便你在 Layout 测试 */}
            {(errorDigest || errorMessage) && (
              <div className="mt-6 space-y-2 rounded-lg border border-slate-200 bg-slate-100 p-4 text-left font-mono text-xs text-slate-600">
                {errorMessage && (
                  <p className="break-all">
                    <span className="font-semibold text-slate-700">
                      错误信息:
                    </span>{" "}
                    {errorMessage}
                  </p>
                )}
                {errorDigest && (
                  <p className="truncate select-all">
                    <span className="font-semibold text-slate-700">
                      错误标识:
                    </span>{" "}
                    {errorDigest}
                  </p>
                )}
              </div>
            )}

            {/* 清爽的常规按钮 */}
            <div className="mt-8 flex items-center justify-center gap-x-4">
              {/* 如果重置方法存在则显示重试按钮 */}
              {reset && (
                <button
                  onClick={() => reset()}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  重试一下
                </button>
              )}

              <a
                href="/"
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-300 ring-inset hover:bg-slate-50"
              >
                返回首页
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
