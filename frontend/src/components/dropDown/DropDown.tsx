import usePopOver from '@hooks/usePopOver';
import UIPopOver from '@ui/popover/UIPopOver';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DROPDOWN_ID = 'DROPDOWN_ID'

export function useDropDown() {
  return usePopOver(DROPDOWN_ID)
}

interface DropDownProps {
  anchor: React.MutableRefObject<HTMLElement|null>
}

const DropDown: React.FC<DropDownProps> = (props) => {

  const [width, setWidth] = useState<number>(window.innerWidth*0.1);
  const navigate = useNavigate()

  useEffect(() => {
    window.onresize = () => setWidth(window.innerWidth*0.1)
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem("Token_Auth")
    navigate('/')
    document.location.reload()
  }, []);

  return (
    <UIPopOver 
      id={DROPDOWN_ID}
      width={width}
      height='auto'
      position='bottom'
      anchor={props.anchor}
      className='drop-down'
    >
      <button type='button' onClick={signout}> Sair </button>
    </UIPopOver>
  );
};

export default DropDown;