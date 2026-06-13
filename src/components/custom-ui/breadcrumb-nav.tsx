import React from "react"

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"

type Item = { title: string; href?: string }

export const BreadcrumbNav = ({
  className,
  items,
}: {
  className?: string
  items: Item[]
}) => {
  return (
    <Breadcrumb className={cn("", className)}>
      <BreadcrumbList>
        {items.map((item, index) => {
          if (item.href) {
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
                </BreadcrumbItem>
                {index + 1 !== items.length ? <BreadcrumbSeparator /> : null}
              </React.Fragment>
            )
          }
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
