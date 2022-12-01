import React from 'react'
import ModalTemplate from "@templates/modalTemplate/ModalTemplate";
import TemplateActions from "@templates/TemplateActions";
import { ICreditCard } from "gigachad-shareds/models";



export default ModalTemplate<ICreditCard>({
  title: 'Cartão de credito',
  actions: [
    TemplateActions.NEW,
    TemplateActions.EDIT, 
    TemplateActions.DELETE
  ],
  body: (props) => {
    return <>modal content</>
  }
})