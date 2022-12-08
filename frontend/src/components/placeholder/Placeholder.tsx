import React from 'react';

interface PlaceholderProps {
  message: string
  children?: React.ReactNode
}

const Placeholder: React.FC<PlaceholderProps> = (props) => {
  return (
    <div className='placeholder'>
      <h3> {props.message} </h3>
      {props.children}
    </div>
  );
};

export default Placeholder;