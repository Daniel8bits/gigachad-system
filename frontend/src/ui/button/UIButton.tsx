import React from 'react';

interface UIButtonProps {
  children: string
  onAction: () => void
}

const UIButton: React.FC<UIButtonProps> = (props) => {
  const handleClick = (e: React.MouseEvent) => {
    props.onAction()
  }
  return (
    <button 
      className='ui-button' 
      type='button'
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
};

export default UIButton;