import LoadingScreen from "@components/loadingScreen/LoadingScreen";
import useModal from "@hooks/useModal";
import { ModalTemplateComponentProps, ModalTemplateParamType } from "@templates/modalTemplate/ModalTemplate";
import TemplateURLActions from "@templates/TemplateURLAction";
import UIModal from "@ui/modal/UIModal";
import getModalName from "@utils/algorithms/getModalName";
import React, { lazy, Suspense, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";


function FilterTableTemplateModal<T>(
  endpoint: string,
  template: () => React.FC<JSX.IntrinsicAttributes>
) {

  const Page: React.FC<JSX.IntrinsicAttributes> = () => {
    const Template = useMemo(() => template(), []);
    const [modal, updateModal] = useModal<ModalTemplateParamType<T>>(endpoint)
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
              mode: modalMode,
              data: modal.params.data
            }
          })
        }

      } else if(modal?.params && modal?.open && modal.params?.mode !== TemplateURLActions.CLOSED) {
        const [modalName, modalMode] = getModalName(location)

        updateModal({
          open: modalMode !== TemplateURLActions.CLOSED,
          params: {
            mode: modalMode,
            data: modal.params.data
          }
        })
      }
    }, [modal?.open, modal?.params?.mode, location.pathname])

    const ModalContent = useMemo(() => {

      const [modalName] = getModalName(location)
      if(modalName) {
        return lazy<React.ComponentType<ModalTemplateComponentProps>>(() => import(`/src/pages${modalName}`))
      }
      return null
    }, [location])

    return (
      <>
        <Template />
        <UIModal<ModalTemplateParamType<any>> 
          id={endpoint} 
          params={{mode: TemplateURLActions.CLOSED, data: null}}
          disableClickOutside
        >
          <Suspense fallback={<LoadingScreen  />}>
            {ModalContent && <ModalContent endpoint={endpoint}  />}
          </Suspense>
        </UIModal>
      </>
    )
  }

  return Page
}

export default FilterTableTemplateModal