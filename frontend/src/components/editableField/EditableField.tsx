import React, { useCallback, useRef, useState } from 'react';

import {MdEdit, MdSave} from 'react-icons/md'

interface EditableFieldProps {
  value: string
  setValue: StateSetter<string>
}

const EditableField: React.FC<EditableFieldProps> = (props) => {

  const [editMode, setEditMode] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = useCallback(() => {
    if(inputRef.current) {
      props.setValue(inputRef.current.value)
      setEditMode(false)
    }
  }, [props.setValue]);

  if(editMode) {
    return (
      <div className='editable-field'>
        <input ref={inputRef} type="text" />
        <button type='button' onClick={handleSave}> <MdSave  /> </button>
      </div>
    )
  }

  return (
    <div className='editable-field'>
      <h2> {props.value} </h2>
      <button type='button' onClick={() => setEditMode(true)}> <MdEdit  /> </button>
    </div>
  );
};

export default EditableField;