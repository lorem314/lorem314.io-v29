import { z } from "zod"

export type Theme = "light" | "dark"
export type PreferredTheme = Theme | "system"

export type Blog = {
  url: string
  id: string
  thumbnail: string

  title: string
  tags: string[]
  createdAt: string
  summary: string

  stats: {
    wordCount: number
    codeBlockCount: number
    imageCount: number
    readingTimeMinutes: number
  }

  cover?: {
    src: string
    width: number
    height: number
  }
}

export type Tag = {
  name: string
  count: number
}

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]
