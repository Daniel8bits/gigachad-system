import React from 'react';
import { Link } from 'react-router-dom';

interface SquareButtonProps {
  to: string,
  label: string
}

const SquareButton: React.FC<SquareButtonProps> = (props) => {
  return <Link className='square-button' to={props.to}> {props.label} </Link>;
};

export default SquareButton;