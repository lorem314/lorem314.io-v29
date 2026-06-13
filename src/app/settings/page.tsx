"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import { useGlobalContext } from "@/components/layouts/context"
import type { PreferredTheme } from "@/types"

export default function Page() {
  const {
    preferredTheme,
    setPreferredTheme,
    isLeftDrawerAlwaysCollapsed,
    setIsLeftDrawerAlwaysCollapsed,
  } = useGlobalContext()

  return (
    <>
      <Card className="mx-auto max-w-md">
        <CardHeader>设置</CardHeader>
        <CardContent>
          <FieldGroup>
            <Field orientation="horizontal" className="justify-between">
              <Label>主题色</Label>
              <Select
                value={preferredTheme}
                onValueChange={(preferredTheme) => {
                  setPreferredTheme(preferredTheme as PreferredTheme)
                }}
              >
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="选择主题" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>主题色</SelectLabel>
                    <SelectItem value="light">白天</SelectItem>
                    <SelectItem value="dark">黑夜</SelectItem>
                    <SelectItem value="system">系统</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field orientation="horizontal">
              <Checkbox
                id="is-left-drawer-always-collapsed"
                className="size-5 rounded-sm"
                checked={isLeftDrawerAlwaysCollapsed}
                onCheckedChange={(checked) => {
                  setIsLeftDrawerAlwaysCollapsed(checked as boolean)
                }}
              />
              <FieldLabel htmlFor="is-left-drawer-always-collapsed">
                总是折叠左侧抽屉
              </FieldLabel>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </>
  )
}
