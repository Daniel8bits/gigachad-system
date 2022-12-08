import LoadingScreen from "@components/loadingScreen/LoadingScreen";
import MainLayout from "@layouts/mainLayout/MainLayout";
import { useSelector } from "@store/Root.store";
import FilterTableTemplateModal from "@templates/modalTemplate/withModalTemplate";
import getModalName from "@utils/algorithms/getModalName";
import React, { lazy, Suspense, useMemo } from "react";
import { useLocation } from "react-router-dom";

function usePage() {

  const auth = useSelector(state => state.auth);
  const location = useLocation()
  const path = location.pathname

  const Page = useMemo(() => {

    if(!auth.signedIn) {
      if(path === '' || path === '/') {
        return lazy(() => import(`../pages`))
      }
      return lazy(() => import(`../pages/401`))
    }

    if(path === '' || path === '/') {
      return lazy(() => {
        try {
          return import(`../pages/${auth.role}${path}`)
        } catch(e: unknown) {
          return import(`../pages/404`)
        }
      })
    }

    if(path.match(/^\/(404|401|403)\/?&/g)) {
      return lazy(() => import(`../pages/${path}`))
    }

    const [modalName, modalMode, pageName] = getModalName(location)

    if(modalName) {
      return lazy(() => {
        try {
          return import(`../pages/${auth.role}${pageName}`)
        } catch(e: unknown) {
          return import(`../pages/404`)
        }
      })
    }
    
    if(path.match(/^(\/([a-zA-Z0-9]|-)+)+$/g)) {

      return lazy(() => {
        try {
          return import(`../pages/${auth.role}${path}`)
        } catch(e: unknown) {  
          return import(`../pages/404`)
        }
      })
    }
    
    return lazy(() => import(`../pages/404`))
  }, [location.pathname, path, auth.signedIn, auth.role])

  if(!auth.signedIn) {
    return (
      <Suspense fallback={<LoadingScreen  />}>
        {Page && <Page  />}
      </Suspense>
    )
  }

  return (
    <>
      <MainLayout>
        <Suspense fallback={<LoadingScreen bellowMenu  />}>
          {Page && <Page  />}
        </Suspense>
      </MainLayout>
      <FilterTableTemplateModal  />
    </>
  )
  
}

export default usePage
