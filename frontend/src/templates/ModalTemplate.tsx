import UIModal from '@ui/modal/UIModal';
import React from 'react';

interface ModalTemplateConfig {

}

function ModalTemplate(config: ModalTemplateConfig) {

  const WithFoo: React.FC<JSX.IntrinsicAttributes> = (props) => {
    return (
      <div>nothing</div>
    )
  };

  WithFoo.displayName = `ModalTemplate`;

  return WithFoo;
}

export default ModalTemplate;
