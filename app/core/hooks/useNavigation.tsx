import { useRouter } from "blitz"
import React, { createContext, useContext, useEffect, useState } from "react"

export interface Navigation {
  navigating: boolean
  navigateTo: (path: string) => void
}

const NavigationContext = createContext<{
  navigatingTo: string | null
  setNavigatingTo: (path: string | null) => void
}>({ navigatingTo: null, setNavigatingTo: () => {} })

/**
 * We use this to change pages instead of useRouter directly to add some delay for the out-animation.
 */
export function useNavigation(): Navigation {
  const { navigatingTo, setNavigatingTo } = useContext(NavigationContext)
  const router = useRouter()
  useEffect(() => {
    if (navigatingTo != null) {
      setTimeout(() => {
        router.push(navigatingTo).then(() => setNavigatingTo(null))
      }, 600)
    }
  }, [navigatingTo, router, setNavigatingTo])

  return {
    navigating: navigatingTo != null,
    navigateTo: setNavigatingTo,
  }
}

export const NavigationProvider: React.FC = ({ children }) => {
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null)
  return (
    <NavigationContext.Provider value={{ navigatingTo, setNavigatingTo }}>
      {children}
    </NavigationContext.Provider>
  )
}
