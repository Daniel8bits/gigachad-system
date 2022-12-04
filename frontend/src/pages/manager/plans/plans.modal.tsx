import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import TemplateActions from '@templates/TemplateActions'
import UIButton from '@ui/button/UIButton';
import Row from '@layouts/grid/Row';
import Column from '@layouts/grid/Column';
import UITextField from '@ui/textfield/UITextField';
import { IPlan, FrequencyPlan } from 'gigachad-shareds/models';
import Endpoint from '@middlewares/Endpoint';
import TemplateURLActions from '@templates/TemplateURLAction';
import UICheckbox from '@ui/checkbox/UICheckbox';

export default ModalTemplate<IPlan>({

  title: 'Planos',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  body: (props) => {

    const [check, setCheck] = useState<boolean>(false);
    
    const nameRef = useRef<HTMLInputElement>(null);
    const valueRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const checkTestRef = useRef<HTMLInputElement>(null);
    const frequencyRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

      if(props.data && new Set([TemplateURLActions.OPEN, TemplateURLActions.EDIT]).has(props.mode)) {
        if(nameRef.current) nameRef.current.value = props.data.name
        if(valueRef.current) valueRef.current.value = props.data.value.toString()
        if(descriptionRef.current) descriptionRef.current.value = props.data.description
        if(checkTestRef.current) checkTestRef.current.value = String(props.data.available)
        if(frequencyRef.current) frequencyRef.current.value = props.data.frequency
      }

    }, [props.data]);

    useEffect(() => {
      
      props.onNew(() => {
        if(nameRef.current) nameRef.current.value = ''
        if(valueRef.current) valueRef.current.value = ''
        if(descriptionRef.current) descriptionRef.current.value = ''
        if(checkTestRef.current) checkTestRef.current.value = ''
        if(frequencyRef.current) frequencyRef.current.value = ''
      })

      props.onSave(() => {
        if(
          !nameRef.current || 
          !valueRef.current || 
          !descriptionRef.current || 
          !checkTestRef.current ||
          !frequencyRef ||
          !props.data?.id
        ) return 'Alguma coisa deu errado!'

        
        return {
          id: props.data.id,
          name: nameRef.current.value,
          description: descriptionRef.current.value,
          value: Number(valueRef.current.value),
          frequency: FrequencyPlan.montly, //frequencyRef.current.value
          available: Boolean(checkTestRef.current.value)
        }

      })
      /*
      props.onDelete(() => {
        return id.current ? id.current.value : ''
      })
      */

    }, []);
    

    return (
      <>
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField 
              ref={nameRef}
              id="name" 
              label="Nome"
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
            <UITextField 
              ref={descriptionRef}
              id="description" 
              label="Descrição"
            />
          </Column>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UICheckbox
              label='check-test' 
              value={check} 
              onAction={setCheck}  
            />
          </Column>
        </Row>

      </>
    )
  }
  
})

//