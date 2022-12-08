import React, { useEffect, useMemo, useRef, useState } from 'react'
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import TemplateActions from '@templates/TemplateActions'
import UIButton from '@ui/button/UIButton';
import Row from '@layouts/grid/Row';
import Column from '@layouts/grid/Column';
import UITextField from '@ui/textfield/UITextField';
import UITable, { UITableDocument } from '@ui/table/UITable';
import { UserType } from '@components/sideMenu/SideMenu';
import Endpoint from '@middlewares/Endpoint';
import TemplateURLActions from '@templates/TemplateURLAction';
import type * as ICustomer from 'gigachad-shareds/endpoint/Customer';
import type * as IPlan from 'gigachad-shareds/endpoint/Plan';

export default ModalTemplate<ICustomer.ICustomer, ICustomer.findOne.Response>({

  title: 'Cliente',
  actions: [
    TemplateActions.NEW,
    TemplateActions.EDIT,
    TemplateActions.DELETE,
    TemplateActions.OPEN
  ],
  body: (props) => {

    const nameRef = useRef<HTMLInputElement>(null);
    const cpfRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    //const [idCurrentPlan, setIdCurrentPlan] = useState<number>(props.data.idcurrentplan) //n ta funcionando
    const idCurrentPlanRef = useRef<number | undefined>(-1);

    function newPlan() {
      props.onSave(() => {
        if (
          !nameRef.current ||
          !cpfRef.current ||
          !emailRef.current ||
          !phoneRef.current ||
          !idCurrentPlanRef.current
        ) return 'Alguma coisa deu errado!'
        
        return {
          cpf: cpfRef.current.value,
          plan: idCurrentPlanRef.current,
          name: nameRef.current.value,
          email: emailRef.current.value,
          phone: phoneRef.current.value,
          type: UserType.customer,
          password: 'auto generated',

        }

      })
    }

    useEffect(() => {

      if (props.data && new Set([TemplateURLActions.OPEN, TemplateURLActions.EDIT]).has(props.mode)) {
        if (nameRef.current) nameRef.current.value = props.data.Users.name
        if (cpfRef.current) cpfRef.current.value = props.data.Users.cpf
        if (emailRef.current) emailRef.current.value = props.data.Users.email
        if (phoneRef.current) phoneRef.current.value = props.data.Users.phone
        idCurrentPlanRef.current = props.data.idcurrentplan
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
          !idCurrentPlanRef.current
        ) return 'Alguma coisa deu errado!'

        return {
          cpf: cpfRef.current.value,
          plan: idCurrentPlanRef.current,
          name: nameRef.current.value,
          email: emailRef.current.value,
          phone: phoneRef.current.value,
          type: UserType.customer,
          password: 'auto generated',

        }

      })

      props.onDelete(() => {
        return cpfRef.current ? cpfRef.current.value : ''
      })

    }, []);
    
    useEffect(() => {
      if (cpfRef.current) {

        const endpoint = new Endpoint<IPlan.IPlan>(`/plan`, true);
        (async () => {
          document.setData(await endpoint.get())
          document.on("page", async (page) => {
            console.log("Event page", page);
            document.setData(await endpoint.get({ page, ...document.getParams() }))
          });
        })();
      }
    }, []);
    
    
    const document = useMemo(() => new UITableDocument<IPlan.IPlan>({
      columns: ['Plano', 'Descrição', 'Frquência', 'Valor', 'Ativo'],
      description: data => ({
        id: String(data.id),
        display: {
          plan: data.name,
          description: data.description,
          frequency: data.frequency,
          value: data.value,
          active: idCurrentPlanRef.current === data.id ? 'SIM' : ''
        }
      }),
      onRowSelected: (selectedRow) => {
        if (idCurrentPlanRef.current) idCurrentPlanRef.current = selectedRow.id
      },
    }), []);

    return (
      <>
        <Row>
          <Column lg={5} xl={5}>
            <UITextField
              ref={nameRef}
              id="name"
              label="Nome"
              disabled={!props.allowEdit}
            />
          </Column>
          <Column lg={5} xl={5}>
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
          <Column lg={5} xl={5}>
            <UITextField ref={emailRef} id="email" label="Email" disabled={!props.allowEdit} />
          </Column>
          <Column lg={5} xl={5}>
            <UITextField ref={phoneRef} id="phone" label="Telefone" disabled={!props.allowEdit} />
          </Column>
        </Row>
        <br />
        <UIButton onAction={newPlan}> Contratar novo plano </UIButton>
    
        <br />
        <UITable document={document} />
        <br />
      </>
    )
  }

})