import React, { useState, useRef } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import { IAdministrative } from 'gigachad-shareds'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker'
import TemplateActions from '@templates/TemplateActions'
import UIComboBox, { UIComboItemData } from '@ui/combobox/UIComboBox';

export default ModalTemplate<IAdministrative>({

  title: 'Funcionários',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  body: (props) => {

    const [date, setDate] = useState<UIDate>(UIDate.now());
    const [check, setCheck] = useState<boolean>(false);
    const [comboValue, setComboValue] = useState<UIComboItemData|null>({value: "1", label: 'atendente'});

    const comboItems = {
        administrative: [
          {value: "0", label: 'gerente'}, 
          {value: "1", label: 'atendente'}, 
          {value: "2", label: 'financeiro'}
        ],
        other: [
          {value: "3", label: 'treinador'}, 
        ]
      }
    
    return (
      <>
        <UIButton onAction={()=>{}}> Salvar </UIButton>
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="name" label="Nome"/>
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="cpf" label="CPF"/>
          </Column>
        </Row>
        
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="adress" label="Endereço"/>
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UIDatePicker id='admissionDate' label='Data de admissão' value={date} onAction={setDate} />
          </Column>
        </Row>

        <Row>
            <UIComboBox id='status' label='Status' items={comboItems} value={comboValue} onAction={setComboValue} allowSearch />
        </Row>
      </>
    )
  }
  
})

//