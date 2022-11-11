import React, { useState, useRef } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import { IAdministrative } from 'gigachad-shareds'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import TemplateActions from '@templates/TemplateActions'
import UICheckBox from '@ui/checkbox/UICheckbox';

export default ModalTemplate<IAdministrative>({

  title: 'Planos',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  body: (props) => {

    const [check, setCheck] = useState<boolean>(false);
    
    return (
      <>
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="name" label="Nome"/>
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="value" label="Valor"/>
          </Column>
        </Row>
        
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="description" label="Descrição"/>
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UICheckBox label='check-test' value={check} onAction={setCheck}  />
          </Column>
        </Row>

      </>
    )
  }
  
})

//