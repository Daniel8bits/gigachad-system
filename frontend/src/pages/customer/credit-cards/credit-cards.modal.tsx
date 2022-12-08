import React, { useCallback, useEffect, useRef, useState } from 'react'
import ModalTemplate from "@templates/modalTemplate/ModalTemplate";
import TemplateActions from "@templates/TemplateActions";
import { ICreditCard } from "gigachad-shareds/endpoint/CreditCard";
import Row from '@layouts/grid/Row';
import Column from '@layouts/grid/Column';
import UITextField from '@ui/textfield/UITextField';
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker';
import Cards, { Focused } from 'react-credit-cards'
import TemplateURLActions from '@templates/TemplateURLAction';


export default ModalTemplate<ICreditCard>({
  title: 'Cartão de credito',
  actions: [
    TemplateActions.NEW,
    TemplateActions.EDIT,
    TemplateActions.DELETE
  ],
  body: (props) => {

    const [name, setName] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [cvv, setCvv] = useState<string>('');
    const [expiry, setExpiry] = useState<string>('');
    const [focus, setFocus] = useState<Focused>();

    const nameRef = useRef<HTMLInputElement>(null);
    const numberRef = useRef<HTMLInputElement>(null);
    const cvvRef = useRef<HTMLInputElement>(null);
    const expiryRef = useRef<HTMLInputElement>(null);

    const handleFocus = useCallback((e: React.FocusEvent) => {
      setFocus(e.target.id as Focused)
    }, []);

    function setData(name = '', number = '', cvv = '', expiry = '') {
      setName(name)
      setNumber(number)
      setCvv(cvv)
      setExpiry(expiry)
    }

    useEffect(() => {
      if (nameRef.current) nameRef.current.value = name
      if (numberRef.current) numberRef.current.value = number
      if (cvvRef.current) cvvRef.current.value = cvv
      if (expiryRef.current) expiryRef.current.value = expiry
    }, [name, number, cvv, expiry]);

    useEffect(() => {

      if (props.data && new Set([TemplateURLActions.OPEN, TemplateURLActions.EDIT]).has(props.mode)) {
        setData(
          props.data.holder,
          props.data.numbers,
          props.data.cvv,
          props.data.expirationDate
        )
      } else {
        //setData()
      }

    }, [props.data, props.mode]);

    useEffect(() => {

      props.onNew(() => setData())

      props.onSave(() => {
        if (
          !nameRef.current ||
          !numberRef.current ||
          !cvvRef.current ||
          !expiryRef.current
        ) return 'Alguma coisa deu errado!'


        return {
          holder: nameRef.current.value,
          numbers: numberRef.current.value.replace(/\s/g, ''),
          cvv: cvvRef.current.value,
          expirationDate: expiryRef.current.value
        }

      })

      props.onDelete(() => {
        return numberRef.current ? numberRef.current.value : ''
      })

    }, []);

    return (
      <Row>
        <Column xl={6} xxl={6}>
          <Row>
            <Column>
              <UITextField
                ref={nameRef}
                id='name'
                label='Nome do cartão'
                onAction={setName}
                onFocus={handleFocus}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <UITextField
                ref={numberRef}
                id='number'
                label='Número'
                mask='{dddd} {dddd} {dddd} {dddd}'
                onAction={setNumber}
                onFocus={handleFocus}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <UITextField
                ref={expiryRef}
                id='expiry'
                label='Data de validade'
                mask='{dd/dd}'
                onAction={setExpiry}
                onFocus={handleFocus}
              />
            </Column>
          </Row>
          <Row>
            <Column xl={6} xxl={6}>
              <UITextField
                ref={cvvRef}
                id='cvc'
                label='CVV'
                mask='{ddd}'
                onAction={setCvv}
                onFocus={handleFocus}
              />
            </Column>
          </Row>
        </Column>
        <Column xl={6} xxl={6}>
          <Cards
            cvc={cvv}
            expiry={expiry.toString()}
            name={name}
            number={number}
            focused={focus}
          />
        </Column>
      </Row>
    )
  }
})