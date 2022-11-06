import getModalName from "@utils/algorithms/getModalName";
import React, { lazy, Suspense, useMemo } from "react";
import { useLocation } from "react-router-dom";

function usePage(fallback?: React.ReactNode) {

  const location = useLocation()

  const path = location.pathname

  const Page = useMemo(() => {
    if(path === '' || path === '/') {
      return lazy(() => import(`../pages`))
    }

    if(path.match(/^\/(customer|attendant|financier|manager|trainer)$/g)) {
      return lazy(() => {
        try {
          return import(`../pages${path}`)
        } catch(e: unknown) {
          return import(`../pages/404`)
        }
      })
    }

    if(path.match(/^\/(customer|attendant|financier|manager|trainer)\/([a-zA-Z]*)$/g)) {

      return lazy(() => {
        try {
          return import(`../pages${path}`)
        } catch(e: unknown) {
          return import(`../pages/404`)
        }
      })
    }

    const [modalName, modalMode, pageName] = getModalName(location)

    if(modalName) {
      return lazy(() => {
        try {
          return import(`../pages${pageName}`)
        } catch(e: unknown) {
          return import(`../pages/404`)
        }
      })
    }

    return lazy(() => import(`../pages/404`))
  }, [location, path])

  return (
    <Suspense fallback={fallback}>
      {Page && <Page  />}
    </Suspense>
  )
}

export default usePage