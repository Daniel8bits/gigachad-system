import React from 'react';

interface UITextfieldProps {
  label: string
}

const UITextfield: React.FC<UITextfieldProps> = (props) => {
  return (
    <div className='ui-textfield'>
      <span>{props.label}</span>
      <input type="text" />
    </div>
  );
};

export default UITextfield;