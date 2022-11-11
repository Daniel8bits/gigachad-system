import React, { useState, useRef } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import { IAdministrative } from 'gigachad-shareds'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import TemplateActions from '@templates/TemplateActions'
import UICheckBox from '@ui/checkbox/UICheckbox';
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker';
import UIComboBox, { UIComboItemData } from '@ui/combobox/UIComboBox';

export default ModalTemplate<IAdministrative>({

  title: 'Equipamentos',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  body: (props) => {

    const [date, setDate] = useState<UIDate>(UIDate.now());
    const [check, setCheck] = useState<boolean>(false);
    const [comboValue, setComboValue] = useState<UIComboItemData|null>({value: "0", label: 'cachorro'});

    const comboItems = {
        mamiferos: [
          {value: "0", label: 'cachorro'}, 
          {value: "1", label: 'gato'}, 
          {value: "2", label: 'rato'}
        ],
        aves: [
          {value: "3", label: 'galinha'}, 
          {value: "4", label: 'aguia'}
        ]
      }

    return (
      <>
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="name" label="Nome"/>
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="qrCode" label="QRCode"/>
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
            <UIComboBox id='status' label='Status' items={comboItems} value={comboValue} onAction={setComboValue} allowSearch />
        </Row>

      </>
    )
  }
  
})

//