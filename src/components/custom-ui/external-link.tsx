import Link from "next/link"

import { ExternalLinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type ExternalLinkProps = React.ComponentProps<"a">

export const ExternalLink = (props: ExternalLinkProps) => {
  const { className, href, target, rel, children, ...restProps } = props

  return (
    <Link
      {...restProps}
      className={cn(
        "inline-flex items-center-safe gap-0.5 text-(--link-color) hover:underline",
        className,
      )}
      href={href || ""}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      <ExternalLinkIcon size={12} />
    </Link>
  )
}
