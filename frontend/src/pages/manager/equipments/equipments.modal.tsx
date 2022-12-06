import React, { useState, useRef, useEffect } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import TemplateActions from '@templates/TemplateActions'
import UICheckBox from '@ui/checkbox/UICheckbox';
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker';
//import UIComboBox, { UIComboItemData } from '@ui/combobox/UIComboBox';
import TemplateURLActions from '@templates/TemplateURLAction';

import type * as IEquipment from 'gigachad-shareds/endpoint/Equipment'

export default ModalTemplate<IEquipment.IEquipment, IEquipment.findOne.Response>({

  title: 'Equipamentos',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  body: (props) => {

    const [date, setDate] = useState<UIDate>(UIDate.now());
    const [check, setCheck] = useState<boolean>(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const qrCodeRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

      if (props.data && new Set([TemplateURLActions.OPEN, TemplateURLActions.EDIT]).has(props.mode)) {
        if (nameRef.current) nameRef.current.value = props.data.name
        if (qrCodeRef.current) qrCodeRef.current.value = props.data.qrcode
        
        //Tem q arrumar depois
        /*
        if (date)
          setDate(new UIDate(
            props.data.maintenanceDate.getDay(),
            props.data.maintenanceDate.getMonth(),
            props.data.maintenanceDate.getFullYear()
          ))*/
      }

    }, [props.data]);

    useEffect(() => {

      props.onNew(() => {
        if (nameRef.current) nameRef.current.value = ''
        if (qrCodeRef.current) qrCodeRef.current.value = ''
      })

      props.onSave(() => {
        if (
          !nameRef.current ||
          !qrCodeRef.current ||
          !date
        ) return 'Alguma coisa deu errado!'

        return {
          qrCode: (qrCodeRef.current.value).toString(),
          name: nameRef.current.value,
          maintenanceDate: new Date(date.getDay(), date.getMonth(), date.getYear()).toString()
        }

      })

      props.onDelete(() => {
        return qrCodeRef.current ? qrCodeRef.current.value : ''
      })

    }, []);

    return (
      <>
        <Row>
          <Column sm={4} md={4} lg={4} xl={4}>
            <UITextField
              ref={nameRef}
              id="name"
              label="Nome"
              disabled={!props.allowEdit}
            />
          </Column>
          <Column sm={2} md={3} lg={3} xl={3}>
            <UITextField
              ref={qrCodeRef}
              id="qrCode"
              label="QRCode"
              disabled={!props.allowEdit}
            />
          </Column>
        </Row>


        <Row>
          <Column sm={4} md={4} lg={4} xl={4}>
            <UIDatePicker id='payDate' label='Última manutenção' value={date} onAction={setDate} />
          </Column>
        </Row>


      </>
    )
  }

})

//