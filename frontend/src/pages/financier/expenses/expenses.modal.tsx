import React, { useState, useRef, useEffect } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import { IExpense, TypeExpense } from 'gigachad-shareds/models'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import TemplateActions from '@templates/TemplateActions'
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker'
import UIComboBox, { UIComboItemData } from '@ui/combobox/UIComboBox';
import TemplateURLActions from '@templates/TemplateURLAction';

export default ModalTemplate<IExpense>({

  title: 'Gasto',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  body: (props) => {

    const [date, setDate] = useState<UIDate>(UIDate.now());
    const [comboValue, setComboValue] = useState<UIComboItemData | null>({ value: "0", label: 'Compra de equipamento' });
    
    const idRef = useRef<HTMLInputElement>(null);
    const qrCodeRef = useRef<HTMLInputElement>(null);
    const totalValueRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const expenseTypeRef = useRef<HTMLInputElement>(null);


    const comboItems = {
      administrative: [
        { value: "0", label: 'Compra de equipamento' },
        { value: "1", label: 'Manutenção de equipamento' },
        { value: "2", label: 'Paragemnto de contas' },
        { value: "3", label: 'Paragemnto de funcionários' }
      ],
      other: [
        { value: "4", label: 'Outros' },
      ]
    }

    useEffect(() => {
      if(props.data && new Set([TemplateURLActions.OPEN, TemplateURLActions.EDIT]).has(props.mode)) {
        if(descriptionRef.current) descriptionRef.current.value = props.data.description
        if(idRef.current) idRef.current.value = props.data.id.toString()
        if(expenseTypeRef.current) expenseTypeRef.current.value = props.data.type
        if(qrCodeRef.current) qrCodeRef.current.value = props.data.qrCodeEquipment
        if(totalValueRef.current) totalValueRef.current.value = props.data.totalValue.toString()
        if(date)
          setDate(new UIDate(
            props.data.date.getDay(),
            props.data.date.getMonth(),
            props.data.date.getFullYear()
          ))
        throw new Error("TEm que ver isso \\/")
      }
    }, [props.data])

    useEffect(() => {
      
      props.onNew(() => {
        if(descriptionRef.current) descriptionRef.current.value = ''
        if(expenseTypeRef.current) expenseTypeRef.current.value = ''
        if(descriptionRef.current) descriptionRef.current.value = ''
        if(qrCodeRef.current) qrCodeRef.current.value = ''
        if(totalValueRef.current) totalValueRef.current.value = ''
      })

      props.onSave(() => {
        if(
          !idRef.current ||
          !date ||
          !descriptionRef.current || 
          !expenseTypeRef.current || 
          !descriptionRef.current || 
          !qrCodeRef.current ||
          !totalValueRef.current
        ) return 'Alguma coisa deu errado!'

        return {
          id: Number(idRef.current.value), 
          qrCodeEquipment: qrCodeRef.current.value,
          date: new Date(date.getDay(), date.getMonth(), date.getYear()),
          totalValue: Number(totalValueRef.current.value),
          description: descriptionRef.current.value,
          type: expenseTypeRef.current.value as TypeExpense,
        }

      })

      props.onDelete(() => {
        return idRef.current ? idRef.current.value : ''
      })

    }, []);
    
    
    return (
      <>
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField 
              ref={descriptionRef}
              id="description" 
              label="Descrição"
            />
          </Column>
          <Row>
          <UIComboBox id='type' label='Tipo de gasto' items={comboItems} value={comboValue} onAction={setComboValue} allowSearch />
        </Row>
        </Row>
        
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField 
              ref={qrCodeRef}
              id="value" 
              label="Valor"
            />
          </Column>
        </Row>

        <Row>
        <Column sm={2} md={2} lg={2} xl={2}>
            <UIDatePicker id='date' label='Data' value={date} onAction={setDate} />
          </Column>
        </Row>

      </>
    )
  }
  
})
