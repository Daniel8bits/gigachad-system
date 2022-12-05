import React, { useState, useRef, useEffect } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import { IAdministrative } from 'gigachad-shareds/models'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker'
import TemplateActions from '@templates/TemplateActions'
import UIComboBox, { UIComboItemData } from '@ui/combobox/UIComboBox';
import TemplateURLActions from '@templates/TemplateURLAction';
import { UserType } from '@components/sideMenu/SideMenu';

export default ModalTemplate<IAdministrative>({

  title: 'Funcionários',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  body: (props) => {

    const [date, setDate] = useState<UIDate>(UIDate.now());
    const [check, setCheck] = useState<boolean>(false);
    const [comboValue, setComboValue] = useState<UIComboItemData | null>({ value: "1", label: 'atendente' });

    const nameRef = useRef<HTMLInputElement>(null);
    const cpfRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLInputElement>(null);
    const ctps = props.data?.Employee.ctps
    const administrative = props.data?.Employee.administrative

    const comboItems = {
      administrative: [
        { value: "0", label: 'gerente' },
        { value: "1", label: 'atendente' },
        { value: "2", label: 'financeiro' }
      ],
      other: [
        { value: "3", label: 'treinador' },
      ]
    }

    useEffect(() => {

      if(props.data && new Set([TemplateURLActions.OPEN, TemplateURLActions.EDIT]).has(props.mode)) {
        if(nameRef.current) nameRef.current.value = props.data.Employee.Users.name
        if(cpfRef.current) cpfRef.current.value = props.data.Employee.Users.cpf
        if(addressRef.current) addressRef.current.value = props.data.Employee.address
        if(emailRef.current) emailRef.current.value = props.data.Employee.Users.email
        if(phoneRef.current) phoneRef.current.value = props.data.Employee.Users.phone
        if(roleRef.current) roleRef.current.value = props.data.role
        if(date) 
          setDate(new UIDate(
            props.data.Employee.admissiondate.getDay(),
            props.data.Employee.admissiondate.getMonth(),
            props.data.Employee.admissiondate.getFullYear()
          ))
        throw new Error("TEm que ver isso \\/")
      }

    }, [props.data]);

    useEffect(() => {
      
      props.onNew(() => {
        if(nameRef.current) nameRef.current.value = ''
        if(cpfRef.current) cpfRef.current.value = ''
        if(addressRef.current) addressRef.current.value = ''
      })

      props.onSave(() => {

        if(
          !nameRef.current || 
          !cpfRef.current || 
          !addressRef.current ||
          !emailRef.current ||
          !phoneRef.current ||
          !roleRef.current ||
          !ctps ||
          !administrative
        ) return 'Alguma coisa deu errado!'

        return {
          cpf: cpfRef.current.value,
          role: roleRef.current.value as IAdministrative["role"],
          Employee: {
            cpf: cpfRef.current.value, 
            administrative,
            ctps,
            admissiondate: new Date(date.getDay(), date.getMonth(), date.getYear()),
            address: addressRef.current.value,
            Users: {
              cpf: cpfRef.current.value,
              name: nameRef.current.value,
              email: emailRef.current.value,
              phone: phoneRef.current.value,
              type: UserType.customer,
              password: 'auto generated'
            }
          }
        }

      })

      props.onDelete(() => {
        return cpfRef.current ? cpfRef.current.value : ''
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
              ref={cpfRef} 
              id="cpf" 
              label="CPF" 
              mask='{ddd.ddd.ddd-dd}'
              disabled={props.mode !== TemplateURLActions.NEW}  
            />
          </Column>
        </Row>

        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField
              ref = {addressRef}
              id="adress" 
              label="Endereço"
              disabled={!props.allowEdit}
            />
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UIDatePicker 
              id='admissionDate' 
              label='Data de admissão' 
              value={date} 
              onAction={setDate}
            />
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