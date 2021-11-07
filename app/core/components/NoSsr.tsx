import { useEffect, useState } from "react"

/**
 * The arwes components don't work wenn with SSR, so me have to mostly disable it.
 */
export const NoSsr: React.FC = ({ children }) => {
  const [showChilden, setShowChildren] = useState(false)

  useEffect(() => {
    setShowChildren(true)
  }, [])

  return showChilden ? <>{children}</> : null
}
