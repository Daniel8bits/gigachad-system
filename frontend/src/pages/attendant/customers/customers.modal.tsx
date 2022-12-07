import React, { useState, useRef, useEffect, useMemo } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import { ICustomer } from 'gigachad-shareds/models'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import UITable, { UITableDocument } from '@ui/table/UITable'
import TemplateActions from '@templates/TemplateActions'
import TemplateURLActions from '@templates/TemplateURLAction'
import type * as IPlan from 'gigachad-shareds/endpoint/Plan';

import type * as IPlan from 'gigachad-shareds/endpoint/Plan';

export default ModalTemplate<ICustomer>({

  title: 'Clientes',
  actions: [
    TemplateActions.OPEN, 
    TemplateActions.EDIT,
    TemplateActions.NEW,
  ],
  body: (props) => { 

    const [check, setCheck] = useState<boolean>(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const cpfRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const idPlanRef = useRef<HTMLInputElement>(null);

    const document = useMemo(() => new UITableDocument<IPlan>({
      columns: ['Plano', 'Frquência', 'Valor'],
      description: data => ({
        id: String(data.id),
        display: {
          plan: data.name,
          date: data.payday,
          value: data.value,
          current: data.id === props.data?.idcurrentPlan ? 'SIM' : 'NÃO'
        }
      })

      //onRowSelected?: (selectedRow: RawDataType) => void,
      //onRowDoubleClicked?: (selectedRow: RawDataType) => void
    }), []);
    
    useEffect(() => {

      if (props.data && new Set([TemplateURLActions.OPEN, TemplateURLActions.EDIT]).has(props.mode)) {
        if (nameRef.current) nameRef.current.value = props.data.Users.name
        if (cpfRef.current) cpfRef.current.value = props.data.cpf
        if (emailRef.current) emailRef.current.value = props.data.Users.email
        if (phoneRef.current) phoneRef.current.value = props.data.Users.phone
        if (idPlanRef.current) idPlanRef.current.value = String(props.data.idCurrentPlan)
      }

    }, [props.data]);

    useEffect(() => {

      props.onNew(() => {
        if (nameRef.current) nameRef.current.value = ''
        if (cpfRef.current) cpfRef.current.value = ''
        if (emailRef.current) emailRef.current.value = ''
        if (phoneRef.current) phoneRef.current.value = ''
      })

      props.onSave(() => {

        if (
          !nameRef.current ||
          !cpfRef.current ||
          !emailRef.current ||
          !phoneRef.current ||
          !idPlanRef
        ) return 'Alguma coisa deu errado!'


        return {
          cpf: cpfRef.current.value,
          idCurrentPlan: Number(idPlanRef),
          Users: {
            cpf: cpfRef.current.value,
            name: nameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            type: UserType.customer,
            password: 'auto generated'
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
          <Column sm={5} md={5} lg={5} xl={5}>
            <UITextField
              ref={nameRef}
              id="name"
              label="Nome"
              disabled={!props.allowEdit}
            />
          </Column>
          <Column sm={5} md={5} lg={5} xl={5}>
            <UITextField
              ref={idPlanRef}
              id="plan"
              label="Plano"
              disabled={!props.allowEdit}
            />
          </Column>
        </Row>

        <Row>
          <Column sm={5} md={5} lg={5} xl={5}>

            <UITextField
              ref={emailRef}
              id="email"
              label="Email"
              disabled={!props.allowEdit}
            />
          </Column>
        </Row>

        <UIButton onAction={() => ({})}> Contratar novo plano </UIButton>

        <UITable document={document} />
      </>
    )
  }

})

//