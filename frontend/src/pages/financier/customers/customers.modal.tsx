import React, { useState, useRef } from 'react';
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import { ICustomer } from 'gigachad-shareds/models'
import Row from '@layouts/grid/Row'
import Column from '@layouts/grid/Column'
import UIButton from '@ui/button/UIButton'
import UITextField from '@ui/textfield/UITextField'
import UITable, { UITableDocument } from '@ui/table/UITable'
import TemplateActions from '@templates/TemplateActions'

export default ModalTemplate<ICustomer>({

  title: 'Cliente',
  actions: [TemplateActions.OPEN, TemplateActions.EDIT],
  body: (props) => {

    const [check, setCheck] = useState<boolean>(false);

    const document = new UITableDocument({
      columns: ['Plan', 'Valor', 'Data de pagamento'], 
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
    
    return (
      <>
        <UIButton onAction={()=>{}}> Salvar </UIButton>
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="name" label="Nome"/>
          </Column>
        </Row>
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="email" label="Email"/>
          </Column>
        </Row>
        <Row>
          <Column sm={2} md={2} lg={2} xl={2}>
            <UITextField id="plan" label="Plano"/>
          </Column>
        </Row>
        
        <UITable document={document} />
      </>
    )
  }
  
})

//