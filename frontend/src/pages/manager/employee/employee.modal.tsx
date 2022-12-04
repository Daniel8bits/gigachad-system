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
    //const [dateRef, setdateRef] = useState<UIDate>(props.data?.Employee.admissiondate);
    //const [roleRef] = useState<UIDate>();

    const nameRef = useRef<HTMLInputElement>(null);
    const cpfRef = useRef<HTMLInputElement>(null);
    const adressRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLInputElement>(null);

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
        if(adressRef.current) adressRef.current.value = props.data.Employee.address
        if(emailRef.current) emailRef.current.value = props.data.Employee.Users.email
        if(phoneRef.current) phoneRef.current.value = props.data.Employee.Users.phone
        if(roleRef.current) roleRef.current.value = props.data.role
        throw new Error("TEm que ver isso \\/")
      }

    }, [props.data]);
/*
    useEffect(() => {
      
      props.onNew(() => {
        if(nameRef.current) nameRef.current.value = ''
        if(cpfRef.current) cpfRef.current.value = ''
        if(adressRef.current) adressRef.current.value = ''
      })

      props.onSave(() => {

        if(
          !nameRef.current || 
          !cpfRef.current || 
          !adressRef.current || 
          //!dateRef.current ||
          !emailRef.current ||
          !phoneRef.current ||
          !roleRef.current
        ) return 'Alguma coisa deu errado!'

        return {
          cpf: cpfRef.current.value,
          role: roleRef.current.value,
          Employee: {
            cpf: cpfRef.current.value, 
            adressRef: adressRef.current.value,
            admissiondate: '',
            administrative: '',
            ctps: '',
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
    
    */
    return (
      <>
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="name" label="Nome" />
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="cpf" label="CPF" />
          </Column>
        </Row>

        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="adress" label="Endereço" />
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