import React, { useCallback, useRef, useState } from 'react'
import ModalTemplate from "@templates/modalTemplate/ModalTemplate";
import TemplateActions from "@templates/TemplateActions";
import { ICreditCard } from "gigachad-shareds/models";
import Row from '@layouts/grid/Row';
import Column from '@layouts/grid/Column';
import UITextField from '@ui/textfield/UITextField';
import UIDatePicker, { UIDate } from '@ui/datepicker/UIDatePicker';
import Cards, { Focused } from 'react-credit-cards'


export default ModalTemplate<ICreditCard>({
  title: 'Cartão de credito',
  actions: [
    TemplateActions.NEW,
    TemplateActions.EDIT, 
    TemplateActions.DELETE
  ],
  body: (props) => {

    //const [updater, setUpdater] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [cvv, setCvv] = useState<string>('');
    const [focus, setFocus] = useState<Focused>();

    const nameRef = useRef<HTMLInputElement>(null);
    const numberRef = useRef<HTMLInputElement>(null);
    const cvvRef = useRef<HTMLInputElement>(null);

    const [expiry, setExpiry] = useState<string>('');

    const handleFocus = useCallback((e: React.FocusEvent) => {
      setFocus(e.target.id as Focused)
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