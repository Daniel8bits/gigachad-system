import FilterTableModalLayout from '@layouts/filterTableModalLayout/FilterTableModalLayout';
import UIModal from '@ui/modal/UIModal';
import getPageName from '@utils/algorithms/getPageName';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TemplateActions from './TemplateActions';
import TemplateURLActions from './TemplateURLAction';

export interface ModalTemplateParamType<T> {
  mode: TemplateURLActions

}

interface ModalTemplateConfig {
  title: string,
  actions: TemplateActions[],
  body: React.FC<JSX.IntrinsicAttributes>
}

function ModalTemplate(config: ModalTemplateConfig) {

  const WithFoo: React.FC<JSX.IntrinsicAttributes> = (props) => {

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
        <config.body  />
      </FilterTableModalLayout>
    )
  };

  WithFoo.displayName = `ModalTemplate`;

  return WithFoo;
}

export default ModalTemplate;
