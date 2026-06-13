import Link from "next/link"
import { ExternalLink } from "../custom-ui/external-link"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-dashed py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/*  */}

        <div className="grid grid-cols-1 gap-8">
          <div>
            <Link className="text-lg font-bold" href="/">
              lorem314.io
            </Link>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              个人博客网站，分享优质教程
            </p>
            <div className="mt-6">
              <div className="text-foreground mb-3 text-sm font-semibold">
                技术驱动
              </div>
              <Techs />
            </div>
          </div>
        </div>

        <Separator className="mt-6 mb-4" />

        <div className="">
          <p className="text-muted-foreground text-sm">
            {/* &#169; {new Date().getFullYear()}{" "} */}
            互联网ICP备案：
            <ExternalLink
              className="text-muted-foreground"
              href="https://beian.miit.gov.cn/"
              target="_blank"
            >
              京ICP备2024101464号-1
            </ExternalLink>
          </p>
        </div>
      </div>
    </footer>
  )
}

const techs = [
  { title: "React", href: "https://react.dev/" },
  { title: "Next.js", href: "https://nextjs.org/" },
  { title: "Fumadocs", href: "https://www.fumadocs.dev/" },
  { title: "CodeHike", href: "https://codehike.org/" },
  { title: "TypeScript", href: "https://www.typescriptlang.org/" },
  { title: "Tailwind CSS", href: "https://tailwindcss.com/" },
  { title: "tRPC", href: "https://trpc.io/" },
  { title: "TanStack", href: "https://tanstack.com/" },
  // { title: "drizzle", href: "https://orm.drizzle.team/" },
  // { title: "postgresql", href: "https://www.postgresql.org/" },
  { title: "Elasticsearch", href: "https://www.elastic.co/" },
  { title: "Sandpack", href: "https://sandpack.codesandbox.io/" },
]

const Techs = () => {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {techs.map((tech, index) => {
        return (
          <Badge key={index} variant="outline" asChild>
            <ExternalLink href={tech.href}>
              <span>{tech.title}</span>
            </ExternalLink>
          </Badge>
        )
      })}
    </div>
  )
}
