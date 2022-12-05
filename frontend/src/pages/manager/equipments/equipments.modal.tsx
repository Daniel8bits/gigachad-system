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

    useEffect(() => {

<<<<<<< HEAD
      if(props.data && new Set([TemplateURLActions.OPEN, TemplateURLActions.EDIT]).has(props.mode)) {
        if(nameRef.current) nameRef.current.value = props.data.name
        if(qrCodeRef.current) qrCodeRef.current.value = props.data.qrCode
=======
      if (props.data && new Set([TemplateURLActions.OPEN, TemplateURLActions.EDIT]).has(props.mode)) {
        if (nameRef.current) nameRef.current.value = props.data.name
        if (qrCodeRef.current) qrCodeRef.current.value = props.data.qrCode
        if (date)
          setDate(new UIDate(
            props.data.maintenanceDate.getDay(),
            props.data.maintenanceDate.getMonth(),
            props.data.maintenanceDate.getFullYear()
          )
          )

        throw new Error("TEm que ver isso \\/")
>>>>>>> 1e878076abda2a985f17c4414a1b93ec2878d6e7
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
<<<<<<< HEAD
          qrCode: qrCodeRef.current.value, 
          name: nameRef.current.value,
          maintenanceDate: new Date()
=======
          qrCode: qrCodeRef.current.value,
          name: nameRef.current.value,
          maintenanceDate: new Date(date.getDay(), date.getMonth(), date.getYear())
>>>>>>> 1e878076abda2a985f17c4414a1b93ec2878d6e7
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
          <UITextField 
              ref={nameRef} 
              id="name" 
              label="Nome" 
              disabled={!props.allowEdit}
            />
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField
              ref={qrCodeRef}
              id="qrCode" 
              label="QRCode" 
            />
          </Column>
        </Row>


        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UIDatePicker id='payDate' label='Última manutenção' value={date} onAction={setDate} />
          </Column>
        </Row>


      </>
    )
  }

})

//