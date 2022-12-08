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
  actions: [TemplateActions.OPEN, TemplateActions.EDIT, TemplateActions.DELETE] ,
  body: (props) => {

    const [date, setDate] = useState<UIDate>(UIDate.now());
    //const [check, setCheck] = useState<boolean>(false);
    
    const [comboValue, setComboValue] = useState<UIComboItemData | null>(
      { value: "attendant", label: 'atendente' }
    );
    //b ta funcionando
    //const [administrative, setAdministrative] = useState<boolean>(false)

    const nameRef = useRef<HTMLInputElement>(null);
    const cpfRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    //const roleRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<string>('');
    const ctps = "";//props.data?.Employee.ctps


    function changeRole(value: UIComboItemData) {
      console.log(value)
      setComboValue(value)
      roleRef.current = value.value
      console.log(roleRef.current)
    }

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
        //if (roleRef.current) roleRef.current.value = props.data?.Administrative?.role
        roleRef.current = props.data?.Administrative?.role

        
        if (!props.data.administrative) {
          setComboValue({ value: "trainer", label: 'treinador' })
        }
        else {
          setComboValue(comboItems.find(el => el.value === props.data?.Administrative?.role) as UIComboItemData)
        }
        
        
        //gambiarra, calma aii
        if(date) 
          setDate(new UIDate(
            new Date(props.data.admissiondate).getDate(),
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
        //console.log(comboValue)

        if (
          !nameRef.current ||
          !cpfRef.current ||
          !addressRef.current ||
          !emailRef.current ||
          !phoneRef.current 
          //!comboValue
          //!roleRef.current
          //!ctps ||
          //!administrative
        ) return 'Alguma coisa deu errado!'
        
        return {
          cpf: cpfRef.current.value,
          name: nameRef.current.value,
          email: emailRef.current.value,
          phone: phoneRef.current.value,
          address: addressRef.current.value,
          role: roleRef.current as IEmployee.IEmployee["role"]

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
            <UIComboBox 
              id='cargo'
              label='Cargo' 
              items={comboItems} 
              value={comboValue as UIComboItemData} 
              onAction={(value)=>{changeRole(value as UIComboItemData)}} 
              allowSearch 
            />
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