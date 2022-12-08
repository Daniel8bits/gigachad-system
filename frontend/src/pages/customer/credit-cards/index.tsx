import React, { useContext } from 'react'
import CustomTemplate, { getCustomTemplateContext } from "@templates/customTemplate/CustomTemplate";
//import { ICreditCard } from 'gigachad-shareds/models';
import TemplateActions from '@templates/TemplateActions';
import Cards from 'react-credit-cards';
import Placeholder from '@components/placeholder/Placeholder';
import CreditCard from '@components/creditCard/CreditCard';
import type * as ICreditCard from 'gigachad-shareds/endpoint/CreditCard';

export default CustomTemplate<ICreditCard.findOne.Response>({
  endpoint: '/creditcard',
  title: 'Cartões de credito',
  actions: [TemplateActions.NEW],
  body: props => {
    const { actions } = useContext(getCustomTemplateContext<ICreditCard.ICreditCard>())
    return (
      <>
        {props.data.map((data,key) => {
          
          return (
            <CreditCard
              key={key}
              data={{...data.CreditCard,...{cvv:"***"}}}
              onEdit={() => actions.edit({...data.CreditCard,...{cvv:"***"}})}
              onDelete={() => actions.delete(String(data.CreditCard.numbers))}
              onOpen={() => actions.open({...data.CreditCard,...{cvv:"***"}})}
            />
          )
        })}
        {props.data.length === 0 && (
          <Placeholder message='Parece que você ainda não possui nenhum cartão cadastrado' />
        )}
      </>
    )
  }
});