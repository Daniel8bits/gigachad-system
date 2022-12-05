import React, { useState, useRef, useEffect } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import { IInvoice, IPlan, ICustomer } from 'gigachad-shareds/models'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import UICheckBox from '@ui/checkbox/UICheckbox'
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker';
import TemplateActions from '@templates/TemplateActions'
import TemplateURLActions from '@templates/TemplateURLAction';


export default ModalTemplate<IInvoice>({

  title: 'Pagar fatura',
  actions: [TemplateActions.OPEN, TemplateActions.NEW],

  body: (props) => {
    const [date, setDate] = useState<UIDate>(UIDate.now());
    const [check, setCheck] = useState<boolean>(false);

    const idPlan = props.data?.idPlan
    const id = props.data?.id
    const cardNumbers = props.data?.cardNumbers
    const cpfCustomer = props.data?.cpfCustomer
    const Plan = props.data?.Plan


    const statusRef = useRef<HTMLInputElement>(null);
    const paydayRef = useRef<HTMLInputElement>(null);
    const methodRef = useRef<HTMLInputElement>(null);
    const valueRef = useRef<HTMLInputElement>(null);



    useEffect(() => {

      if (props.data && new Set([TemplateURLActions.OPEN, TemplateURLActions.EDIT]).has(props.mode)) {
        if (statusRef.current) statusRef.current.value = props.data.status
        if (paydayRef.current) paydayRef.current.value = props.data.payday
        if (methodRef.current) methodRef.current.value = props.data.payMethod
        if (valueRef.current) valueRef.current.value = props.data.value.toString()
      }
    }, [props.data]);



    useEffect(() => {
      props.onNew(() => {
        if (statusRef.current) statusRef.current.value = ''
        if (paydayRef.current) paydayRef.current.value = ''
        if (methodRef.current) methodRef.current.value = ''
        if (valueRef.current) valueRef.current.value = ''
      })

      props.onSave(() => {

        if (
          !statusRef.current ||
          !paydayRef.current ||
          !methodRef.current ||
          !valueRef.current ||
          !idPlan ||
          !id ||
          !cpfCustomer ||
          !cardNumbers ||
          !Plan
        ) return 'Alguma coisa deu errado!'


        return {
          id,
          cpfCustomer,
          idPlan,
          cardNumbers,
          value: Number(valueRef.current.value),
          status: statusRef.current.value,
          payday: paydayRef.current.value,
          payMethod: methodRef.current.value,
          Plan
        }

      })

    }, [])


    return (
      <>
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField
              id="plan"
              label="Plano"
              defaultValue={Plan?.name}
            />
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField
              ref={statusRef}
              id="status"
              label="Status"
            />
          </Column>
        </Row>

        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UIDatePicker id='payDate' label='Data de pagamento' value={date} onAction={setDate} />
          </Column>
        </Row>

        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField
              ref={methodRef}
              id="method"
              label="Método de pagamento"
            />
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField
              ref={valueRef}
              id="value"
              label="Valor"
            />
          </Column>
        </Row>

        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UICheckBox
              label='Pago pessoalmente'
              value={check}
              onAction={setCheck}
            />
            {/*COMO VAMOS DEIXAR ESSA CARALHA AQUI?*/}

          </Column>
        </Row>

        <UIButton onAction={() => ({})}> Escolher forma de pagamento </UIButton>

      </>
    )
  }

})
