import React, { useState, useRef } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import { IAdministrative } from 'gigachad-shareds'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import UITable, { UITableDocument } from '@ui/table/UITable'
import TemplateActions from '@templates/TemplateActions'
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker';

export default ModalTemplate<IAdministrative>({

  title: 'Pagamento',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  body: (props) => {

    const [date, setDate] = useState<UIDate>(UIDate.now());
    const [check, setCheck] = useState<boolean>(false);
    
    return (
      <>
        <UIButton onAction={()=>{}}> Salvar </UIButton>
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="name" label="Nome do cliente"/>
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="cpf" label="CPF"/>
          </Column>
        </Row>
        
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="num" label="Número"/>
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="plano" label="Plano"/>
          </Column>
        </Row>

        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
          <UIDatePicker id='expirationDate' label='Data de expiração' value={date} onAction={setDate} />
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
          <UIDatePicker id='payDate' label='Data de pagamento' value={date} onAction={setDate} />
          </Column>
        </Row>

        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="payMethod" label="Forma de pagamento"/>
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="status" label="Status"/>
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="value" label="Valor"/>
          </Column>
        </Row>


      </>
    )
  }
  
})

//