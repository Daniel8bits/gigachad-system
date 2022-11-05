import UIModal from "@ui/modal/UIModal"
import getPageName from '@utils/algorithms/getPageName'
import React, { lazy, Suspense, useMemo } from "react"
import Endpoint from "./Endpoint"

function Middleware<T>(endpoint: string, preloaded: boolean, template: (endpoint: Endpoint<T>) => React.FC<JSX.IntrinsicAttributes>) {
  const endpointRequester = new Endpoint<T>(endpoint, preloaded)

  let ModalContent: React.LazyExoticComponent<React.ComponentType<any>> | null = null;
  if (location.search === '') {
    ModalContent = lazy(() => import(`../pages${getPageName()}`))
  }

  const Page: React.FC<JSX.IntrinsicAttributes> = () => {
    const Template = useMemo(() => template(endpointRequester), []);
    return (
      <>
        <Template />
        {/*<UIModal id={endpoint}>
          <Suspense fallback={<p> loading :3 </p>}>
            {ModalContent && <ModalContent  />}
          </Suspense>
        </UIModal>*/}
      </>
    )
  }

  return Page
}

export default Middleware