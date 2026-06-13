"use client"

import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardAction,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useContext } from "./context"

export const Search = () => {
  const { searchTerm, onSearchTermChange } = useContext()

  return (
    <Card className="col-span-full lg:col-span-6">
      <CardHeader>
        <CardTitle>搜索</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          className="py-5"
          type="search"
          value={searchTerm}
          onChange={(event) => {
            onSearchTermChange(event.target.value)
          }}
        />
      </CardContent>
    </Card>
  )
}
