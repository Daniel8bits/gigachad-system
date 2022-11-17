import React, { useState, useRef, useEffect } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import { IExpense } from 'gigachad-shareds/models'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import TemplateActions from '@templates/TemplateActions'

export default ModalTemplate<IExpense>({

  title: 'Gasto',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  body: (props) => {

    //const [check, setCheck] = useState<boolean>(false);

    /*
    useEffect(() => {
      
      props.onNew(() => {

      })

      props.onSave(() => {

        
        return 'lorem ipsum'
      })

      props.onDelete(() => {
        return 'primary key'
      })

    }, []);
    */
    
    return (
      <>
        <UIButton onAction={() => ({})}> Salvar </UIButton>
        <Row>
          
        </Row>
      </>
    )
  }
  
})
