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

import type * as IEmployee from 'gigachad-shareds/endpoint/Employee'

export default ModalTemplate<IEmployee.IEmployee, IEmployee.EmployeeResponse>({

  title: 'Funcionários',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  body: (props) => {

    const [date, setDate] = useState<UIDate>(UIDate.now());
    //const [check, setCheck] = useState<boolean>(false);
    const [comboValue, setComboValue] = useState<UIComboItemData | null>({ value: "attendant", label: 'atendente' });
    //const [administrative, setAdministrative] = useState<boolean>(false)

    const nameRef = useRef<HTMLInputElement>(null);
    const cpfRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLInputElement>(null);
    const ctps = "";//props.data?.Employee.ctps
    //const administrative = false;//props.data?.Employee.administrative
    /*
        const comboItems = {
          administrative: [
            { value: "manager", label: 'gerente' },
            { value: "attendant", label: 'atendente' },
            { value: "financer", label: 'financeiro' }
          ],
          other: [
            { value: "trainer", label: 'treinador' },
          ]
        }
    */
    const comboItems = [
      { value: "manager", label: 'gerente' },
      { value: "attendant", label: 'atendente' },
      { value: "financer", label: 'financeiro' },
      { value: "trainer", label: 'treinador' }
    ]
    useEffect(() => {

      if (props.data && new Set([TemplateURLActions.OPEN, TemplateURLActions.EDIT]).has(props.mode)) {
        if (nameRef.current) nameRef.current.value = props.data.Users.name
        if (cpfRef.current) cpfRef.current.value = props.data.cpf
        if (addressRef.current) addressRef.current.value = props.data.address
        if (emailRef.current) emailRef.current.value = props.data.Users.email
        if (phoneRef.current) phoneRef.current.value = props.data.Users.phone
        if (roleRef.current) roleRef.current.value = props.data?.Administrative?.role

        if (!props.data.administrative) {
          setComboValue({ value: "trainer", label: 'treinador' })
        }
        else {
          setComboValue(comboItems.find(el => el.value === props.data?.Administrative?.role) as UIComboItemData)
        }
        
        //gambiarra, calma aii
        if(date) 
          setDate(new UIDate(
            new Date(props.data.admissiondate).getDay(),
            new Date(props.data.admissiondate).getMonth(),
            new Date(props.data.admissiondate).getFullYear()
          ))
      }

    }, [props.data]);

    useEffect(() => {

      props.onNew(() => {
        if (nameRef.current) nameRef.current.value = ''
        if (cpfRef.current) cpfRef.current.value = ''
        if (addressRef.current) addressRef.current.value = ''
      })

      props.onSave(() => {

        if (
          !nameRef.current ||
          !cpfRef.current ||
          !addressRef.current ||
          !emailRef.current ||
          !phoneRef.current ||
          !comboValue
          //!roleRef.current
          //!ctps ||
          //!administrative
        ) return 'Alguma coisa deu errado!'

        console.log(comboValue?.value)
        return {
          cpf: cpfRef.current.value,
          name: nameRef.current.value,
          email: emailRef.current.value,
          phone: phoneRef.current.value,
          address: addressRef.current.value,
          Administrative: {
            role: comboValue?.value
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
          <Column sm={3} md={3} lg={3} xl={3}>
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
          <Column sm={3} md={3} lg={3} xl={3}>
            <UITextField
              ref={emailRef}
              id="email"
              label="Email"
              disabled={!props.allowEdit}
            />
          </Column>
        </Row>

        <Row>
          <Column sm={3} md={3} lg={3} xl={3}>
            <UITextField
              ref={addressRef}
              id="adress"
              label="Endereço"
              disabled={!props.allowEdit}
            />
          </Column>
          <Column sm={3} md={3} lg={3} xl={3}>
            <UITextField
              ref={phoneRef}
              id="phone"
              label="Phone"
            />
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UIComboBox id='cargo' label='Cargo' items={comboItems} value={comboValue} onAction={setComboValue} allowSearch />
          </Column>

        </Row>
        <Row>
          <Column sm={3} md={3} lg={3} xl={3}>
            <UIDatePicker
              id='admissionDate'
              label='Data de admissão'
              value={date}
              onAction={setDate}
            />
          </Column>


        </Row>
      </>
    )
  }

})

//