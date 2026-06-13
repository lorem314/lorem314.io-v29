import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import z from "zod"

import { createTRPCRouter } from "../init"
import { publicProcedure } from "../init"

// import { search } from "./search"

export const appRouter = createTRPCRouter({
  test: publicProcedure.query(() => {
    return {
      message: "Hello World!",
      time: new Date(),
    }
  }),
  // search,
})

export type AppRouter = typeof appRouter

export type RouterOutputs = inferRouterOutputs<AppRouter>
export type RouterInputs = inferRouterInputs<AppRouter>
