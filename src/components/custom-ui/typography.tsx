import Image, { ImageProps } from "next/image"

import { HashIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const HeadingLink = ({
  className,
  ...restProps
}: React.ComponentProps<"a">) => {
  return (
    <a
      className={cn(
        className,
        "not-prose group/link inline-flex flex-wrap items-center hover:no-underline",
      )}
      {...restProps}
    />
  )
}

const HeadingHashIcon = ({
  className,
  ...restProps
}: React.ComponentProps<"svg">) => {
  return (
    <HashIcon
      className={cn(
        "invisible",
        "absolute -left-7 size-6",
        // "group-target/heading:visible",
        "group-hover/link:visible",
        className,
      )}
      {...restProps}
    />
  )
}

export const H1 = ({
  className,
  children,
  ...restProps
}: React.ComponentProps<"h1">) => {
  return (
    <h1 className={cn("text-4xl font-bold", className)} {...restProps}>
      {children}
    </h1>
  )
}

export const H2 = ({
  className,
  children,
  ...restProps
}: React.ComponentProps<"h2">) => {
  return (
    <h2
      className={cn(
        "group/heading relative scroll-m-20",
        "text-3xl first:mt-0",
        className,
      )}
      {...restProps}
    >
      <HeadingLink href={`#${restProps.id}`}>
        {/* <HeadingHashIcon /> */}
        {children}
      </HeadingLink>
    </h2>
  )
}

export const H3 = ({
  className,
  children,
  ...restProps
}: React.ComponentProps<"h3">) => {
  return (
    <h3
      className={cn(
        "group/heading relative",
        "scroll-m-20 text-2xl",
        className,
      )}
      {...restProps}
    >
      <HeadingLink href={`#${restProps.id}`}>
        {/* <HeadingHashIcon className="size-5.5" /> */}
        {children}
      </HeadingLink>
    </h3>
  )
}

export const H4 = ({
  className,
  children,
  ...restProps
}: React.ComponentProps<"h4">) => {
  return (
    <h4
      className={cn("group/heading relative", "scroll-m-20 text-xl", className)}
      {...restProps}
    >
      <HeadingLink href={`#${restProps.id}`}>
        {/* <HeadingHashIcon className="size-5" /> */}
        {children}
      </HeadingLink>
    </h4>
  )
}

export const H5 = ({
  className,
  children,
  ...restProps
}: React.ComponentProps<"h5">) => {
  return (
    <h4
      className={cn("group/heading relative", "scroll-m-20 text-lg", className)}
      {...restProps}
    >
      <HeadingLink href={`#${restProps.id}`}>
        {/* <HeadingHashIcon className="size-4.5" /> */}
        {children}
      </HeadingLink>
    </h4>
  )
}

export const H6 = ({
  className,
  children,
  ...restProps
}: React.ComponentProps<"h6">) => {
  return (
    <h4
      className={cn(
        "group/heading relative",
        "scroll-m-20 text-base",
        className,
      )}
      {...restProps}
    >
      <HeadingLink href={`#${restProps.id}`}>
        {/* <HeadingHashIcon className="size-4" /> */}
        {children}
      </HeadingLink>
    </h4>
  )
}

type MdxImgProps = Omit<ImageProps, "src"> & {
  src?: ImageProps["src"] | string
}
export const Img = ({
  src,
  alt,
  width,
  height,
  placeholder,
  ...restProps
}: MdxImgProps) => {
  if (!src) return null
  if (typeof src === "object" && "src" in src && src !== undefined) {
    return (
      <Image
        className="dark:brightness-75"
        src={src.src as string}
        alt={alt ?? ""}
        width={width ?? src?.width ?? 800}
        height={height ?? src?.height ?? 600}
        {...restProps}
      />
    )
  }
  return null
}

export const InlineCode = ({
  className,
  ...restProps
}: React.ComponentProps<"code">) => {
  return (
    <code
      className={cn(
        "font-mono font-medium",
        "before:content-[''] after:content-['']",
        "bg-muted text-accent-foreground rounded px-1 py-0.5",
        "border-muted-foreground/10 border",
        className,
      )}
      {...restProps}
    />
  )
}

export const P = ({ className, ...restProps }: React.ComponentProps<"p">) => {
  return <p className={cn(className)} {...restProps} />
}

export const BlockQuote = ({
  className,
  ...restProps
}: React.ComponentProps<"blockquote">) => {
  return (
    <div className="not-prose">
      <blockquote className={cn("not-prose", className)} {...restProps} />
    </div>
  )
}

export const Details = ({
  children,
  className,
  ...restProps
}: React.ComponentProps<"details">) => {
  return (
    <details
      className={cn("bg-red-500", "[&>summary]:cursor-pointer", className)}
      {...restProps}
    >
      {children}
    </details>
  )
}
