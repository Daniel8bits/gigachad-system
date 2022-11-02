import React, { lazy, Suspense } from "react";

function useAsyncComponent(path: string, fallback?: React.ReactNode) {
  const Page = lazy(() => import(`../pages${path}`))
  return <Suspense fallback={fallback}><Page  /></Suspense>
}

export default useAsyncComponent