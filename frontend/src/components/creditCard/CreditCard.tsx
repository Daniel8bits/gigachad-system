import { ICreditCard } from 'gigachad-shareds/models';
import React from 'react';
import Cards from 'react-credit-cards'
import {MdDelete, MdEdit} from 'react-icons/md'

interface CreditCardProps {
  data: ICreditCard
  onEdit: () => void
  onDelete: () => void
}

const CreditCard: React.FC<CreditCardProps> = (props) => {
  console.log(props.data)
  return (
    <div className='credit-card'>
      <div>
        <Cards
          cvc={props.data.cvv}
          expiry={props.data.expirationDate}
          name={props.data.holder}
          number={props.data.numbers}
        />
      </div>
      <div>
        <button type='button' onClick={props.onEdit} aria-label='edit'><MdEdit  /></button>
        <button type='button' onClick={props.onDelete} aria-label='delete'><MdDelete  /></button>
      </div>
    </div>
  );
};

export default CreditCard;