import { BlitzPage, ErrorBoundary } from "blitz"
import React, { Suspense as ReactSuspense } from "react"

export const Suspense: React.FC = ({ children }) => {
  return (
    <ErrorBoundary fallbackRender={(error) => <div>Error: {JSON.stringify(error)}</div>}>
      <ReactSuspense fallback={<div>Loading...</div>}>{children}</ReactSuspense>
    </ErrorBoundary>
  )
}
