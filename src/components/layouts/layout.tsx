"use client"

import * as React from "react"

import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { Footer } from "./footer"
import { Drawer, useDrawer } from "@/components/custom-ui/drawer"
import { cn } from "@/lib/utils"
import { GlobalContext } from "./context"
import { useIsClient } from "@/hooks/use-is-client"
import { useLocalStorage } from "@/hooks/use-local-storage"

import { Theme, PreferredTheme } from "@/types"

const preferredThemeValidator = (value: string) => {
  if (!["light", "dark", "system"].includes(value)) return false
  return true
}

export function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isClient = useIsClient()

  const [theme, setTheme] = React.useState<Theme>("light")
  const [preferredTheme, setPreferredTheme] = useLocalStorage<PreferredTheme>(
    "preferred-theme",
    "system",
    preferredThemeValidator,
  )

  const [isLeftDrawerAlwaysCollapsed, setIsLeftDrawerAlwaysCollapsed] =
    useLocalStorage("is-left-drawer-always-collapsed", false)

  const {
    isCollapsed: isLeftDrawerCollapsed,
    isOpen: isLeftDrawerOpen,
    handler: leftDrawerHandler,
  } = useDrawer({
    isAlwaysCollapsed: isLeftDrawerAlwaysCollapsed,
    mediaQuery: "(max-width: 1800px)",
  })

  const showLeftDrawerOpener =
    isLeftDrawerAlwaysCollapsed || isLeftDrawerCollapsed
  const drawerWidth = "360px"

  // theme
  React.useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleThemeChange = ({ matches }: { matches: boolean }) => {
      if (matches) {
        // document.documentElement.setAttribute("data-theme", "dark")
        document.documentElement.classList.replace("light", "dark")
        setTheme("dark")
      } else {
        // document.documentElement.setAttribute("data-theme", "light")
        document.documentElement.classList.replace("dark", "light")
        setTheme("light")
      }
    }

    if (preferredTheme === "system") {
      darkQuery.addEventListener("change", handleThemeChange)
      const theme = darkQuery.matches ? "dark" : "light"
      // document.documentElement.setAttribute("data-theme", theme)
      document.documentElement.classList.remove("light")
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add(theme)
      setTheme(theme)
    } else {
      darkQuery.removeEventListener("change", handleThemeChange)
      // document.documentElement.setAttribute("data-theme", preferredTheme)
      document.documentElement.classList.remove("light")
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add(preferredTheme)
      setTheme(preferredTheme)
    }

    return () => {
      darkQuery.removeEventListener("change", handleThemeChange)
    }
  }, [preferredTheme])

  return isClient ? (
    <div className="flex min-h-svh flex-col">
      <GlobalContext.Provider
        value={{
          theme,
          preferredTheme,
          setPreferredTheme,
          isLeftDrawerAlwaysCollapsed,
          setIsLeftDrawerAlwaysCollapsed,
        }}
      >
        <Header
          className="z-40 h-(--header-height)"
          showLeftDrawerOpener={showLeftDrawerOpener}
          openLeftDrawer={leftDrawerHandler.open}
        />

        <div className="flex min-h-[calc(100vh-var(--header-height))]">
          {showLeftDrawerOpener ? (
            <Drawer
              isOpen={isLeftDrawerOpen}
              onClose={leftDrawerHandler.close}
              side="left"
              size={drawerWidth}
            >
              {({ closeDrawer }) => <Sidebar closeDrawer={closeDrawer} />}
            </Drawer>
          ) : (
            <aside
              className={cn(
                "sticky top-(--header-height) border-r border-dashed",
                "h-[calc(100vh-var(--header-height))]",
                "bg-sidebar shrink-0 overflow-auto",
              )}
              style={{ width: drawerWidth }}
            >
              <Sidebar />
            </aside>
          )}

          <main className="relative flex min-w-0 grow flex-col">
            <div className="my-12 grow px-4">{children}</div>
            <Footer />
          </main>
        </div>
      </GlobalContext.Provider>
    </div>
  ) : null
}
