import useModal from '@hooks/useModal';
import FilterTableModalLayout from '@layouts/filterTableModalLayout/FilterTableModalLayout';
import Endpoint from '@middlewares/Endpoint';
import Middleware from '@middlewares/Middleware';
import UIModal from '@ui/modal/UIModal';
import getPageName from '@utils/algorithms/getPageName';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TemplateActions from './TemplateActions';
import TemplateURLActions from './TemplateURLAction';

export interface ModalTemplateParamType<T> {
  mode: TemplateURLActions
  data: T

}

interface ModalTemplateBodyProps<T> {
  mode: TemplateURLActions
  data?: T
  endpoint: Endpoint<T>
}

interface ModalTemplateConfig<T> {
  title: string,
  actions: TemplateActions[],
  body: React.FC<ModalTemplateBodyProps<T>>
}

interface ModalTemplateComponentProps {
  endpoint: string
}

function ModalTemplate<T>(config: ModalTemplateConfig<T>) {

  const ModalTemplateComponent: React.FC<ModalTemplateComponentProps> = (props) => {

    const Template = Middleware<T>(props.endpoint, false, endpoint => {
      return (() => {
        const [modal, updateModal] = useModal<ModalTemplateParamType<T>>(props.endpoint)
    
        const navigate = useNavigate()
        const location = useLocation()
    
        const onClose = useCallback(() => {
          const pageName = getPageName(location)
          navigate(pageName)
        }, []);
    
        return (
          <FilterTableModalLayout 
            title={config.title}
            onClose={onClose}
          >
            <config.body 
              data={modal?.params?.data} 
              endpoint={endpoint}  
              mode={modal?.params?.mode ?? TemplateURLActions.CLOSED}
            />
          </FilterTableModalLayout>
        )
      }) as React.FC<JSX.IntrinsicAttributes>

    })

    return <Template  />
  };

  ModalTemplateComponent.displayName = `ModalTemplate`;

  return ModalTemplateComponent;
}

export default ModalTemplate;
