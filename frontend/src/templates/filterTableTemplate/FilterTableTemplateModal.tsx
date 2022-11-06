import LoadingScreen from "@components/loadingScreen/LoadingScreen";
import useModal from "@hooks/useModal";
import { ModalTemplateParamType } from "@templates/ModalTemplate";
import TemplateURLActions from "@templates/TemplateURLAction";
import UIModal from "@ui/modal/UIModal";
import getModalName from "@utils/algorithms/getModalName";
import React, { lazy, Suspense, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";


function FilterTableTemplateModal(modalName: string, template: () => React.FC<JSX.IntrinsicAttributes>) {

  const Page: React.FC<JSX.IntrinsicAttributes> = () => {
    const Template = useMemo(() => template(), []);
    const [modal, updateModal] = useModal<ModalTemplateParamType<any>>(modalName)
    const location = useLocation()

    /**
     *  MODAL MODE OPENING
     */
    useEffect(() => {
      if(modal && modal.params?.mode === TemplateURLActions.CLOSED) {
        const [modalName, modalMode] = getModalName(location)

        if(modalName && modalMode !== TemplateURLActions.CLOSED) {
          updateModal({
            open: true,
            params: {
              mode: modalMode
            }
          })
        }

      } else if(modal?.open && modal.params?.mode !== TemplateURLActions.CLOSED) {
        const [modalName, modalMode] = getModalName(location)

        if(modalMode === TemplateURLActions.CLOSED) {
          updateModal({
            open: false,
            params: {
              mode: modalMode
            }
          })
        }
      }
    }, [modal, location])

    const ModalContent = useMemo(() => {
      const [modalName] = getModalName(location)
      if(modalName) {
        return lazy(() => import(`/src/pages${modalName}`))
      }
      return null
    }, [location])

    return (
      <>
        <Template />
        <UIModal<ModalTemplateParamType<any>> 
          id={modalName} 
          params={{mode: TemplateURLActions.CLOSED}}
          disableClickOutside
        >
          <Suspense fallback={<LoadingScreen  />}>
            {ModalContent && <ModalContent  />}
          </Suspense>
        </UIModal>
      </>
    )
  }

  return Page
}

export default FilterTableTemplateModal