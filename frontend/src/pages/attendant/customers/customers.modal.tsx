import React, { useState, useRef, useEffect } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import { ICustomer } from 'gigachad-shareds/models'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import UITable, { UITableDocument } from '@ui/table/UITable'
import TemplateActions from '@templates/TemplateActions'
import TemplateURLActions from '@templates/TemplateURLAction'
import { UserType } from '@components/sideMenu/SideMenu';

export default ModalTemplate<ICustomer>({

  title: 'Clientes',
  actions: [TemplateActions.OPEN, TemplateActions.NEW],
  body: (props) => {

    const [check, setCheck] = useState<boolean>(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const cpfRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const idPlanRef = useRef<HTMLInputElement>(null);

    const document = new UITableDocument({
      columns: ['Plano', 'Valor', 'Data de pagamento'],
      description: data => ({
        id: 'id',
        display: {
          plan: 'ashdf',
          value: 'asfadsg',
          date: 'asfggsd',
        }
      })
      //onRowSelected?: (selectedRow: RawDataType) => void,
      //onRowDoubleClicked?: (selectedRow: RawDataType) => void
    });

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
        <UIButton onAction={() => { }}> Salvar </UIButton>
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
              ref={idPlanRef}
              id="plan"
              label="Plano"
            />
          </Column>
        </Row>

        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>

            <UITextField
              ref={emailRef}
              id="email"
              label="Email"
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