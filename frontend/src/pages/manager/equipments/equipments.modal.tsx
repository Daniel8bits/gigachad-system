import React, { useState, useRef, useEffect } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import { IEquipment } from 'gigachad-shareds/models'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import TemplateActions from '@templates/TemplateActions'
import UICheckBox from '@ui/checkbox/UICheckbox';
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker';
//import UIComboBox, { UIComboItemData } from '@ui/combobox/UIComboBox';
import TemplateURLActions from '@templates/TemplateURLAction';

export default ModalTemplate<IEquipment>({

  title: 'Equipamentos',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  body: (props) => {

    const [date, setDate] = useState<UIDate>(UIDate.now());
    const [check, setCheck] = useState<boolean>(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const qrCodeRef = useRef<HTMLInputElement>(null);
    //const maintenanceDate = useRef<HTMLInputElement>(null);
    //const Lastmaintenance = useRef<HTMLInputElement>(null);
    //const acquisition = useRef<HTMLInputElement>(null);
    //const status = useRef<HTMLInputElement>(null);

    useEffect(() => {

      if(props.data && new Set([TemplateURLActions.OPEN, TemplateURLActions.EDIT]).has(props.mode)) {
        if(nameRef.current) nameRef.current.value = props.data.name
        if(qrCodeRef.current) qrCodeRef.current.value = props.data.qrCode
      }

    }, [props.data]);

    useEffect(() => {
      
      props.onNew(() => {
        if(nameRef.current) nameRef.current.value = ''
        if(qrCodeRef.current) qrCodeRef.current.value = ''
      })

      props.onSave(() => {
        if(
          !nameRef.current ||
          !qrCodeRef.current
        ) return 'Alguma coisa deu errado!'

        return {
          qrCode: qrCodeRef.current.value, 
          name: nameRef.current.value,
          maintenanceDate: new Date()
        }

      })  

      props.onDelete(() => {
        return qrCodeRef.current ? qrCodeRef.current.value : ''
      })

    }, []);

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


      </>
    )
  }
  
})

//