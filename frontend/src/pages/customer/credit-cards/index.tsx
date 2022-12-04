import React, { useContext } from 'react'
import CustomTemplate, { getCustomTemplateContext } from "@templates/customTemplate/CustomTemplate";
import { ICreditCard } from 'gigachad-shareds/models';
import TemplateActions from '@templates/TemplateActions';
import Cards from 'react-credit-cards';
import Placeholder from '@components/placeholder/Placeholder';
import CreditCard from '@components/creditCard/CreditCard';

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
    const { actions } = useContext(getCustomTemplateContext<ICreditCard>())
    return (
      <>
        {props.data.map((data) => {
          return (
            <CreditCard 
              key={data.numbers} 
              data={data}  
              onEdit={() => actions.edit(data)}
              onDelete={() => actions.delete(String(data.numbers))}
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