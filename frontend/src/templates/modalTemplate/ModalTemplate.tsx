import Actions, { ActionsCallbacks } from '@components/actions/Actions';
import { useDialogBox } from '@components/dialogBox/DialogBox';
import { useMessageBox } from '@components/messageBox/MessageBox';
import useModal from '@hooks/useModal';
import { DialogType } from '@layouts/dialogLayout/DialogLayout';
import FilterTableModalLayout from '@layouts/modalLayout/ModalLayout';
import Endpoint from '@middlewares/Endpoint';
import Middleware from '@middlewares/Middleware';
import { useFilterTableTemplateModal } from '@templates/filterTableTemplate/FilterTableTemplateModal';
import UIModal from '@ui/modal/UIModal';
import getPageName from '@utils/algorithms/getPageName';
import React, { useCallback, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TemplateActions from '../TemplateActions';
import TemplateURLActions from '../TemplateURLAction';

export interface ModalTemplateParamType<T> {
  mode: TemplateURLActions
  data: T
  endpoint: string|null
}

type DataGetter<T> = (() => T|string)

interface ModalTemplateBodyProps<T> {
  mode: TemplateURLActions
  data?: T
  onSave: (data: DataGetter<T>) => void
  onNew: (callback: () => void) => void
  onDelete: (pk: () => string) => void
}

interface ModalTemplateConfig<T> {
  title: string,
  actions: TemplateActions[],
  body: React.FC<ModalTemplateBodyProps<T>>
}

export interface ModalTemplateComponentProps {
  endpoint: string
}

function ModalTemplate<T>(config: ModalTemplateConfig<T>) {

  const ModalTemplateComponent: React.FC<ModalTemplateComponentProps> = (props) => {

    const Template = Middleware<T>(props.endpoint, false, endpoint => {
      return (() => {
        
        const refOnSave = useRef<DataGetter<T>>();
        const refOnNew = useRef<() => void>();
        const refOnDelete = useRef<() => string>();

        const [modal, updateModal] = useFilterTableTemplateModal<T>()
        const [, updateDialog] = useDialogBox()
        const [, updateMessageBox] = useMessageBox()
    
        const navigate = useNavigate()
        const location = useLocation()

        const refDataBackup = useRef<T>(modal.params?.data as T)

        /*
        

          TODOs demais:

          - criar template de tela home dos funcionários
          - criar template de tela livre para as telas dos cartões, treinos e calendário
          - criar template de tela para os tutoriais
          - criar home do usuário
          - criar tela de login
          - criar tela do profile
          - chorar
        
        */

        const handleOnSave = useCallback((data: DataGetter<T>) => {
          refOnSave.current = data
        }, []);

        const handleOnNew = useCallback((callback: () => void) => {
          refOnNew.current = callback
        }, []);

        const handleOnDelete = useCallback((callback: () => string) => {
          refOnDelete.current = callback
        }, []);

       /*============================== 
                    ACTIONS
        ==============================*/

        const actions = useMemo<ActionsCallbacks>(() => {

          const actionsSet = new Set<TemplateActions>(config.actions)

          const actionsCallbacks: ActionsCallbacks = {}
          const pageName = getPageName(location)
          
          if (
            modal?.params?.mode === TemplateURLActions.EDIT ||
            modal?.params?.mode === TemplateURLActions.NEW
          ) {

            actionsCallbacks.onSave = async () => {

              if(refOnSave.current) {

                const data = refOnSave.current()
                if(typeof data === 'string') {
                  updateMessageBox({
                    open: true,
                    params: {
                      message: data,
                      type: DialogType.ERROR
                    }
                  })
                  return
                }

                updateDialog({
                  open: true,
                  params: {
                    message: "Deseja salvar as alterações?",
                    type: DialogType.WARNING,
                    onConfirm: async () => {
                      await endpoint.post(data)
                        .then(value => {
                          navigate(`${pageName}/${TemplateURLActions.OPEN}`)
                        })
                    }
                  }
                })
              }
              
            }

            actionsCallbacks.onCancel = () => {
              navigate(`${pageName}/${TemplateURLActions.OPEN}`)
            }

          } else {

            if (actionsSet.has(TemplateActions.NEW)) {
              actionsCallbacks.onNew = () => {
                refOnNew.current?.()
                navigate(`${pageName}/${TemplateURLActions.NEW}`)
              }
            }

            if (actionsSet.has(TemplateActions.EDIT)) {
              actionsCallbacks.onEdit = () => {
                navigate(`${pageName}/${TemplateURLActions.EDIT}`)
              }
            }

            if (actionsSet.has(TemplateActions.DELETE)) {
              actionsCallbacks.onDelete = () => {
                
                updateDialog({
                  open: true,
                  params: {
                    message: "Deseja excluir registro?",
                    type: DialogType.WARNING,
                    onConfirm: async () => {
                      if(refOnDelete.current) {
                        await endpoint.delete(refOnDelete.current())
                          .then(value => {
                            navigate(pageName)
                          })
                      }
                    }
                  }
                })

              }
            }
          }

          return actionsCallbacks

        }, [modal?.params?.mode])
    
        const onClose = useCallback(() => {
          const pageName = getPageName(location)
          navigate(pageName)
        }, []);
    
        return (
          <FilterTableModalLayout 
            title={config.title}
            onClose={onClose}
          >
            <Actions actionsCallbacks={actions}  />
            <config.body 
              data={modal?.params?.data}
              mode={modal?.params?.mode ?? TemplateURLActions.CLOSED}
              onSave={handleOnSave}
              onNew={handleOnNew}
              onDelete={handleOnDelete}
            />
          </FilterTableModalLayout>
        )
      }) as React.FC<JSX.IntrinsicAttributes>

    })

    return <Template />
  };

  ModalTemplateComponent.displayName = `ModalTemplate`;

  return ModalTemplateComponent;
}

export default ModalTemplate;
