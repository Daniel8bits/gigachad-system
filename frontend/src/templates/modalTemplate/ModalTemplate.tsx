import Actions, { ActionsCallbacks } from '@components/actions/Actions';
import useModal from '@hooks/useModal';
import FilterTableModalLayout from '@layouts/filterTableModalLayout/FilterTableModalLayout';
import Endpoint from '@middlewares/Endpoint';
import Middleware from '@middlewares/Middleware';
import UIModal from '@ui/modal/UIModal';
import getPageName from '@utils/algorithms/getPageName';
import React, { useCallback, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TemplateActions from '../TemplateActions';
import TemplateURLActions from '../TemplateURLAction';

export interface ModalTemplateParamType<T> {
  mode: TemplateURLActions
  data: T

}

type DataGetter = (() => Record<string, string|undefined>)

interface ModalTemplateBodyProps<T> {
  mode: TemplateURLActions
  data?: T
  getData: (data: DataGetter) => void
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
        
        const refGetData = useRef<DataGetter>();
        const [modal, updateModal] = useModal<ModalTemplateParamType<T>>(props.endpoint)
    
        const navigate = useNavigate()
        const location = useLocation()

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

        const handleGetData = useCallback((data: DataGetter) => {
          refGetData.current = data
        }, []);

       /*============================== 
                    ACTIONS
        ==============================*/

        const actions = useMemo<ActionsCallbacks>(() => {

          const actionsSet = new Set<TemplateActions>(config.actions)

          const actionsCallbacks: ActionsCallbacks = {}
          const pageName = getPageName(location)
          
          if (modal?.params?.mode === TemplateURLActions.NEW) {
            actionsCallbacks.onSave = () => {
              navigate(`${pageName}/${TemplateURLActions.OPEN}`)
            }
            actionsCallbacks.onCancel = () => {
              navigate(`${pageName}/${TemplateURLActions.OPEN}`)
            }
          } else if (modal?.params?.mode === TemplateURLActions.EDIT) {
            actionsCallbacks.onSave = () => {
              navigate(`${pageName}/${TemplateURLActions.OPEN}`)
            }
            actionsCallbacks.onCancel = () => {
              navigate(`${pageName}/${TemplateURLActions.OPEN}`)
            }
          } else {
            if (actionsSet.has(TemplateActions.EDIT)) {
              actionsCallbacks.onEdit = () => {
                navigate(`${pageName}/${TemplateURLActions.EDIT}`)
              }
            }

            if (actionsSet.has(TemplateActions.DELETE)) {
            actionsCallbacks.onDelete = () => {
              console.log('here delete line')
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
              getData={handleGetData}
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
