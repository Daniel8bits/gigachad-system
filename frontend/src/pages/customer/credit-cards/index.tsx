import React from 'react'
import CustomTemplate from "@templates/customTemplate/CustomTemplate";
import { ICreditCard } from 'gigachad-shareds/models';
import TemplateActions from '@templates/TemplateActions';
import Cards from 'react-credit-cards';
import Placeholder from '@components/placeholder/Placeholder';

export default CustomTemplate<ICreditCard>({
  endpoint: '/creditcard',
  title: 'Cartões de credito',
  actions: [
    TemplateActions.NEW, 
    TemplateActions.OPEN, 
    TemplateActions.EDIT, 
    TemplateActions.DELETE
  ],
  body: props => {
    return (
      <>
        {props.data.map((data) => {
          return (
            <Cards  
              cvc={data.cvv}
              expiry={data.expirationDate}
              name={data.holder}
              number={data.numbers}
            />
          )
        })}
        {props.data.length === 0 && (
          <Placeholder message='Parece que você ainda não possui nenhum cartão cadastrado'  />
        )}
      </>
    )
  }
});