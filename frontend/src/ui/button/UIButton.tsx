import React from 'react';

interface UIButtonProps {
  children: any
  onAction: () => void
  template?: string
  className?: string
}

const UIButton: React.FC<UIButtonProps> = (props) => {
  const handleClick = (e: React.MouseEvent) => {
    props.onAction()
  }
  return (
    <button 
      className={`ui-button ${props.template ?? ''} ${props.className ?? ''}`}
      type='button'
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
};

export default UIButton;