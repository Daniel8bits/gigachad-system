import React, { useState, useRef } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import { IAdministrative } from 'gigachad-shareds'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import TemplateActions from '@templates/TemplateActions'
import UIComboBox, { UIComboItemData } from '@ui/combobox/UIComboBox';
import UIDatePicker, {UIDate} from '@ui/datepicker/UIDatePicker';

export default ModalTemplate<IAdministrative>({

  title: 'Planos',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  body: (props) => {

    const [date, setDate] = useState<UIDate>(UIDate.now());
    const [check, setCheck] = useState<boolean>(false);
    const [comboValue, setComboValue] = useState<UIComboItemData|null>({value: "0", label: 'equipamentBuy'});

    const comboItems = {
        typed: [
          {value: "0", label: 'equipamentBuy'}, 
          {value: "1", label: 'equipamentMaintenance'}, 
          {value: "2", label: 'billPayment'},
          {value: "3", label: 'employeePayment'}
        ],
        other: [
          {value: "4", label: 'others'}, 
        ]
      }
    
    return (
      <>
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="description" label="Descrição"/>
          </Column>
        </Row>
        
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UIComboBox id='exprensesType' label='Tipo de gasto' items={comboItems} value={comboValue} onAction={setComboValue} allowSearch />
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="equipament" label="Equipamento"/>
          </Column>
        </Row>

        <Row>
        <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="value" label="Valor"/>
          </Column>
        </Row>

        <Row>
        <Column sm={2} md={2} lg={2} xl={2}>
            <UIDatePicker id='admissionDate' label='Data de admissão' value={date} onAction={setDate} />
          </Column>
        </Row>
      </>
    )
  }
  
})

//