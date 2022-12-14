import { ICreditCard } from 'gigachad-shareds/models';
import React from 'react';
import Cards from 'react-credit-cards'
import {MdDelete, MdEdit} from 'react-icons/md'

interface CreditCardProps {
  data: ICreditCard
  onEdit: () => void
  onDelete: () => void
  onOpen: () => void
}

const CreditCard: React.FC<CreditCardProps> = (props) => {
  console.log(props.data)
  return (
    <div className='credit-card'>
      <button type='button' onClick={props.onOpen}>
        <Cards
          cvc={props.data.cvv}
          expiry={props.data.expirationDate}
          name={props.data.holder}
          number={`${props.data.numbers.substring(0,4)}********${props.data.numbers.substring(12, 17)}`}
        />
      </button>
      <div>
        <button type='button' onClick={props.onEdit} aria-label='edit'><MdEdit  /></button>
        <button type='button' onClick={props.onDelete} aria-label='delete'><MdDelete  /></button>
      </div>
    </div>
  );
};

export default CreditCard;