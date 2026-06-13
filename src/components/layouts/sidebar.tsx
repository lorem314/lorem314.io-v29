"use client"

import Link from "next/link"
import { House, Newspaper, Book, Settings, User } from "lucide-react"

import { buttonVariants } from "../ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const routes = [
  { title: "主页", href: "/", Icon: House },
  { title: "博客", href: "/blogs", Icon: Newspaper },
  // { title: "", href: "/books", Icon: Book },
  { title: "设置", href: "/settings", Icon: Settings },
]

export function Sidebar({ closeDrawer }: { closeDrawer?: () => void }) {
  const linkClassName = buttonVariants({ size: "icon-lg", variant: "outline" })

  return (
    <nav className="flex h-full">
      <ul
        className={cn(
          "bg-background overflow-y-hidden border-r border-dashed py-4",
          "flex shrink-0 basis-16 flex-col items-center gap-4",
        )}
      >
        {routes.map((route, index) => {
          return (
            <li key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={route.href}
                    className={cn(linkClassName)}
                    onClick={closeDrawer}
                  >
                    <route.Icon />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{route.title}</TooltipContent>
              </Tooltip>
            </li>
          )
        })}
      </ul>
      <section
        className={cn(
          "bg-background mx-2.5 mt-2.5 rounded-t-lg border px-4 py-2.5",
          "no-scrollbar grow overflow-y-auto shadow",
          "flex justify-center",
        )}
      >
        <div className="text-muted-foreground mt-4 text-sm">
          <p>这里暂时还没有内容...</p>
        </div>
      </section>
    </nav>
  )
}
