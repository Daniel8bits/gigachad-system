import React, { useMemo } from 'react';
import { IconType } from 'react-icons';
import { 
  MdOutlineClose,
  MdInfo,
  MdWarning,
  MdError
} from 'react-icons/md';


export enum DialogType {
  INFO,
  WARNING,
  ERROR
}

interface DialogLayoutProps {
  message: string
  type: DialogType
  onClose: () => void
  children: any
}

const DialogLayout: React.FC<DialogLayoutProps> = (props) => {
  
  const [Icon, typeClass] = useMemo<[IconType, string]>(() => {
    switch (props.type) {
      case DialogType.INFO:
        return [MdInfo, 'info']
      case DialogType.WARNING:
        return [MdWarning, 'warning']
      case DialogType.ERROR:
        return [MdError, 'error']
      default:
    }
    return [MdInfo, 'info']
  }, [props.type])

  return (
    <div className={`dialog-layout ${typeClass}`}>
      <div className='header'>
        <Icon  />
        <h2> {props.message} </h2>
        <button type='button' onClick={props.onClose}> <MdOutlineClose  /> </button>
      </div>
      <div className='content'>
        {props.children}
      </div>
    </div>
  );
};

export default DialogLayout;