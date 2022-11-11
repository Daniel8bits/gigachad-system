import LoadingScreen from "@components/loadingScreen/LoadingScreen";
import useModal from "@hooks/useModal";
import { ModalTemplateComponentProps, ModalTemplateParamType } from "@templates/modalTemplate/ModalTemplate";
import TemplateURLActions from "@templates/TemplateURLAction";
import UIModal from "@ui/modal/UIModal";
import getModalName from "@utils/algorithms/getModalName";
import React, { lazy, Suspense, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

const MAIN_MODAL = 'MAIN_MODAL'

export function useFilterTableTemplateModal<T>() {
  return useModal<ModalTemplateParamType<T>>(MAIN_MODAL)
}

const FilterTableTemplateModal: React.FC<JSX.IntrinsicAttributes> = () => {
  const [modal, updateModal] = useFilterTableTemplateModal<unknown>()
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
            data: modal.params.data,
            endpoint: modal.params.endpoint
          }
        })
      }

    } else if(modal?.params && modal?.open && modal.params?.mode !== TemplateURLActions.CLOSED) {
      const [modalName, modalMode] = getModalName(location)

      updateModal({
        open: modalMode !== TemplateURLActions.CLOSED,
        params: {
          mode: modalMode,
          data: modal.params.data,
          endpoint: modal.params.endpoint
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
    <UIModal<ModalTemplateParamType<unknown>> 
      id={MAIN_MODAL} 
      params={{mode: TemplateURLActions.CLOSED, data: null, endpoint: null}}
      disableClickOutside
    >
      <Suspense fallback={<LoadingScreen  />}>
        {ModalContent && modal?.params?.endpoint &&
          <ModalContent endpoint={modal.params.endpoint}  />}
      </Suspense>
    </UIModal>
  )
}

export default FilterTableTemplateModal