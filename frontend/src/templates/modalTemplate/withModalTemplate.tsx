import LoadingScreen from "@components/loadingScreen/LoadingScreen";
import useModal from "@hooks/useModal";
import { useSelector } from "@store/Root.store";
import { ModalTemplateComponentProps } from "@templates/modalTemplate/ModalTemplate";
import TemplateURLActions from "@templates/TemplateURLAction";
import UIModal from "@ui/modal/UIModal";
import getModalName from "@utils/algorithms/getModalName";
import React, { lazy, Suspense, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

export interface ModalTemplateParamType<T> {
  mode: TemplateURLActions
  data: T
  endpoint: string|null
  name?: string
}

const MAIN_MODAL = 'MAIN_MODAL'

export function useModalTemplate<T>() {
  return useModal<ModalTemplateParamType<T>>(MAIN_MODAL)
}

const withModalTemplate: React.FC<JSX.IntrinsicAttributes> = () => {
  const [modal, updateModal] = useModalTemplate<unknown>()
  const location = useLocation()
  const role = useSelector(state => state.auth.role);

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
            ...modal.params,
            mode: modalMode
          }
        })
      }

    } else if(modal?.params && modal?.open && modal.params?.mode !== TemplateURLActions.CLOSED) {
      const [modalName, modalMode] = getModalName(location)

      updateModal({
        open: modalMode !== TemplateURLActions.CLOSED,
        params: {
          ...modal.params,
          mode: modalMode,
        }
      })

    }
  }, [modal?.open, modal?.params?.mode, location.pathname])

  const ModalContent = useMemo(() => {

    if(!modal) return null

    if(!modal.params?.name) {
      const [modalName] = getModalName(location)
      if(modalName) {
        return lazy<React.ComponentType<ModalTemplateComponentProps>>(() => import(`/src/pages/${role}${modalName}`))
      }
    }

    if(modal.params?.name) {
      return lazy(() => {
        try {
          return import(`/src/pages/${modal.params?.name}.modal`);
        } catch(e: unknown) {
          return import('../../pages/404')
        }
      })
    }

    return null

  }, [location.pathname, role, modal?.params?.name])

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

export default withModalTemplate