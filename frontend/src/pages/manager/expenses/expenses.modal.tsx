import React, { useState, useRef, useEffect } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import { TypeExpense } from 'gigachad-shareds/models'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import TemplateActions from '@templates/TemplateActions'
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker'
import UIComboBox, { UIComboItemData } from '@ui/combobox/UIComboBox';
import TemplateURLActions from '@templates/TemplateURLAction';

import type * as IExpense from 'gigachad-shareds/endpoint/Expense'

export default ModalTemplate<IExpense.IExpense, IExpense.findOne.Response>({

  title: 'Gasto',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  body: (props) => {

    const [date, setDate] = useState<UIDate>(UIDate.now());
    const [comboValue, setComboValue] = useState<UIComboItemData | null>({ value: "equipamentBuy", label: 'Compra de equipamento' });
    const [dateRef, setdateRef] = useState<UIDate>(UIDate.now()); // temp

    const idRef = useRef<HTMLInputElement>(null);
    const qrCodeRef = useRef<HTMLInputElement>(null);
    const totalValueRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);


    const comboItems = {
      administrative: [
        { value: "equipamentBuy", label: 'Compra de equipamento' },
        { value: "equipamentMaintenance", label: 'Manutenção de equipamento' },
        { value: "billPayment", label: 'Pagamento de contas' },
        { value: "employeePayment", label: 'Pagamento de funcionários' }
      ],
      other: [
        { value: "others", label: 'Outros' },
      ]
    }

    useEffect(() => {
      if (props.data && new Set([TemplateURLActions.OPEN, TemplateURLActions.EDIT]).has(props.mode)) {
        if (descriptionRef.current) descriptionRef.current.value = props.data.description
        if (idRef.current) idRef.current.value = (props.data?.id ?? "0").toString()
        if (qrCodeRef.current) qrCodeRef.current.value = props.data?.qrcodeequipment ?? ""
        if (totalValueRef.current) totalValueRef.current.value = String(props.data.totalvalue)
        const valueToMap = {
          equipamentBuy: { value: "equipamentBuy", label: 'Compra de equipamento' },
          equipamentMaintenance: { value: "equipamentMaintenance", label: 'Manutenção de equipamento' },
          billPayment: { value: "billPayment", label: 'Pagamento de contas' },
          employeePayment: { value: "employeePayment", label: 'Pagamento de funcionários' },
          others: { value: "others", label: 'Outros' }
        }
        setComboValue(valueToMap[props.data.type] as UIComboItemData)
        /*
        Arrumar isso
        if(date)
          setDate(new UIDate(
            props.data.date.getDay(),
            props.data.date.getMonth(),
            props.data.date.getFullYear()
          ))*/
      }
    }, [props.data])

    useEffect(() => {

      props.onNew(() => {
        if (descriptionRef.current) descriptionRef.current.value = ''
        if (descriptionRef.current) descriptionRef.current.value = ''
        if (qrCodeRef.current) qrCodeRef.current.value = ''
        if (totalValueRef.current) totalValueRef.current.value = ''
      })

      props.onSave(() => {
        if (
          !descriptionRef.current ||
          !descriptionRef.current ||
          !qrCodeRef.current ||
          !totalValueRef.current
        ) return 'Alguma coisa deu errado!'

        return {
          ...(qrCodeRef.current.value === "" ? {} : {qrCodeequipment:qrCodeRef.current.value === ""}),
          date: new Date(date.getDay(), date.getMonth(), date.getYear()).toString(),
          totalValue: Number(totalValueRef.current.value),
          description: (descriptionRef.current.value).toString(),
          type: (comboValue?.value ?? "others") as TypeExpense,
        }

      })

      props.onDelete(() => {
        return props.data?.id ? String(props.data.id) : ''
      })

    }, []);


    return (
      <>
        <Row>
          <Column sm={3} md={3} lg={3} xl={3}>
            <UITextField
              ref={descriptionRef}
              id="description"
              label="Descrição"
              disabled={!props.allowEdit}
            />
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UIComboBox id='type' label='Tipo de gasto' items={comboItems} value={comboValue} onAction={setComboValue} allowSearch />
          </Column>
        </Row>

        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField
              ref={qrCodeRef}
              id="qrcode"
              label="QRCode"
              disabled={!props.allowEdit}
            />
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField
              ref={totalValueRef}
              id="value"
              label="Valor"
              disabled={!props.allowEdit}
            />
          </Column>
        </Row>

        <Row>
          <Column sm={3} md={3} lg={3} xl={3}>
            <UIDatePicker id='date' label='Data' value={date} onAction={setDate} />
          </Column>
        </Row>

      </>
    )
  }

})
