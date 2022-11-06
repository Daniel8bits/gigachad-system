import UIButton from '@ui/button/UIButton';
import React from 'react';

export interface ActionsCallbacks {
  onOpen?: () => void
  onSave?: () => void
  onEdit?: () => void
  onNew?: () => void
  onDelete?: () => void
}

interface ActionsProps {
  actionsCallbacks: ActionsCallbacks
}

const Actions: React.FC<ActionsProps> = (props) => {
  const {
    onOpen, 
    onSave, 
    onEdit, 
    onNew, 
    onDelete
  } = props.actionsCallbacks
  return (
    <div className='actions'>
      {onOpen   && <UIButton onAction={onOpen}>   Abrir </UIButton>}
      {onSave   && <UIButton onAction={onSave}>   Salvar </UIButton>}
      {onEdit   && <UIButton onAction={onEdit}>   Editar </UIButton>}
      {onNew    && <UIButton onAction={onNew}>    Novo </UIButton>}
      {onDelete && <UIButton onAction={onDelete}> Deletar </UIButton>}
    </div>
  );
};

export default Actions;