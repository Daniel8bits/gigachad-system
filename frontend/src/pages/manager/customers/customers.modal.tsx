import React from 'react'
import ModalTemplate from '@templates/modalTemplate/ModalTemplate'
import TemplateActions from '@templates/TemplateActions'

export default ModalTemplate({
  
  title: 'modal test',
  actions: [
    TemplateActions.NEW,
    TemplateActions.EDIT, 
    TemplateActions.DELETE
  ],
  body: () => {

    return <div>something</div>
  }
  
})