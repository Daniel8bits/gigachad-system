import React, { useState, useRef, useEffect } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import { IInvoice } from 'gigachad-shareds/models'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker';
import TemplateActions from '@templates/TemplateActions'
import TemplateURLActions from '@templates/TemplateURLAction';
import UIComboBox, { UIComboItemData } from '@ui/combobox/UIComboBox';
import Endpoint from '@middlewares/Endpoint';
import type * as IPlan from 'gigachad-shareds/endpoint/Plan';
import type * as ICustomer from 'gigachad-shareds/endpoint/Customer';


export default ModalTemplate<IInvoice>({

  title: 'Pagamento da fatura',
  actions: [TemplateActions.OPEN, TemplateActions.DELETE, TemplateActions.NEW],

  body: (props) => {
    const [date, setDate] = useState<UIDate>(UIDate.now());
    //const [check, setCheck] = useState<boolean>(false);
    const [methodValue, setMethodValue] = useState<UIComboItemData | null>({ value: "creditCard", label: 'Cartão de crédito' });
    const [statusValue, setStatusValue] = useState({ value: 'open', label: 'Em aberto' });

    const comboItemsMethod = [
        { value: "creditCard", label: 'Cartão de crédito' },
        { value: "pix", label: 'Pix' },
        { value: "bankSlip", label: 'Boleto bancário' },
        { value: "money", label: 'Dinheiro' }
    ]

    const comboItemsStatus = [
      { value: 'canceled', label: 'Cancelado' },
      { value: 'paid', label: 'Pago' },
      { value: 'open', label: 'Em aberto' }
    ]

    const idPlan = props.data?.idplan
    const id = props.data?.id
    const cardNumbers = props.data?.cardNumbers
    const cpfCustomer = props.data?.cpfCustomer
    const Plan = props.data?.Plan 

    const valueRef = useRef<HTMLInputElement>(null);
    const paydayRef = useRef<HTMLInputElement>(null);
    const namePlanRef = useRef<HTMLInputElement>(null);
    const statusRef = useRef<string>('');
    const methodRef = useRef<string>('');
    

    function changeStatus(value: UIComboItemData) {
      setStatusValue(value)
      statusRef.current = value.value
    }
    function changeMethod(value: UIComboItemData) {
      setMethodValue(value)
      methodRef.current = value.value
    }

    //buscar plano do cliente para criar a fatura, n ta funcionando
    const endpoint = new Endpoint<ICustomer.ICustomer>(`/customer/plan`, true);
        (async () => {
          console.log(await endpoint.get())
          
        })();
  

    useEffect(() => {

      if (props.data && new Set([TemplateURLActions.OPEN, TemplateURLActions.EDIT]).has(props.mode)) {
        if (paydayRef.current) paydayRef.current.value = props.data.payday
        if (valueRef.current) valueRef.current.value = props.data.value.toString()
        if(namePlanRef.current) namePlanRef.current.value = props.data.Plan.name
        statusRef.current = props.data.status
        methodRef.current = props.data.paymethod
        setMethodValue(comboItemsMethod.find(el => el.value === props.data?.paymethod) as UIComboItemData)
        setStatusValue(comboItemsStatus.find(el => el.value === props.data?.status) as UIComboItemData)
        
      }
    }, [props.data]);

    useEffect(() => {
      props.onNew(() => {
        if (statusRef.current) statusRef.current = ''
        if (paydayRef.current) paydayRef.current.value = ''
        if (methodRef.current) methodRef.current = ''
        if (valueRef.current) valueRef.current.value = ''

        setMethodValue(null)
        setStatusValue({ value: 'open', label: 'Em aberto' })
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
          status: statusRef.current,
          payday: new Date().toString(),
          payMethod: methodRef.current,
        }

      })

    }, [])

    return (
      <>
        <Row>
          <Column sm={3} md={3} lg={3} xl={3}>
            <UITextField
              ref={namePlanRef}
              id="plan"
              label="Plano"
            />
          </Column>
          <Column sm={2} md={23} lg={3} xl={3}>
          <UIComboBox 
              id='status'
              label='Status' 
              items={comboItemsStatus} 
              value={statusValue as UIComboItemData} 
              onAction={(value)=>{changeStatus(value as UIComboItemData)}} 
              allowSearch 
            />
          </Column>
          <Column sm={3} md={3} lg={3} xl={3}>
            <UIComboBox 
                id='method'
                label='Forma de pagamento' 
                items={comboItemsMethod} 
                value={methodValue as UIComboItemData} 
                onAction={(value)=>{changeMethod(value as UIComboItemData)}} 
                allowSearch 
              />
          </Column>
          
        </Row>

        <Row>
          <Column sm={3} md={3} lg={3} xl={3}>
            <UITextField
              ref={valueRef}
              id="value"
              label="Valor"
              disabled={false}
            />
          </Column>
          
          <Column sm={3} md={3} lg={3} xl={3}>
            <UIDatePicker id='payDate' label='Data de pagamento' value={date} onAction={setDate} />
          </Column>
        </Row>
      </>
    )
  }

})
