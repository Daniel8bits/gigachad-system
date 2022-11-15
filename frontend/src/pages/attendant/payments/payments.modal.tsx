import React, { useState, useRef } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import { ICustomer } from 'gigachad-shareds'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import UICheckBox from '@ui/checkbox/UICheckbox'
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker';
import TemplateActions from '@templates/TemplateActions'
import TemplateURLActions from '@templates/TemplateURLAction';


export default ModalTemplate<ICustomer>({

  title: 'Pagar fatura',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  
  body: (props) => {
    const [date, setDate] = useState<UIDate>(UIDate.now());
    const [check, setCheck] = useState<boolean>(false);

    return (
      <>
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="number" label="Número da fatura"/>
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="plan" label="Plano"/>
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="status" label="Status"/>
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
            <UITextField id="method" label="Método de pagamento"/>
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="value" label="Valor"/>
          </Column>
        </Row>

        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UICheckBox label='check-test' value={check} onAction={setCheck}  />
          </Column>
        </Row>

        <UIButton onAction={() => ({})}> Escolher forma de pagamento </UIButton>

      </>
    )
  }
  
})
