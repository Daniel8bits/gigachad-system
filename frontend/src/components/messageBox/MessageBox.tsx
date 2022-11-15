import useModal from '@hooks/useModal';
import DialogLayout, { DialogType } from '@layouts/dialogLayout/DialogLayout';
import UIButton from '@ui/button/UIButton';
import UIModal from '@ui/modal/UIModal';
import React, { useCallback, useMemo } from 'react';
import { IconType } from 'react-icons';

const MESSAGE_BOX = "MESSAGE_BOX"

export interface MessageBoxParams {
  message: string
  type: DialogType
}

export function useMessageBox() {
  return useModal<MessageBoxParams>(MESSAGE_BOX)
}

interface MessageBoxProps {
  
}

const MessageBox: React.FC<MessageBoxProps> = () => {
  const [messageBox, updateMessageBox] = useMessageBox()

  const handleOnClose = useCallback(() => {
    updateMessageBox({open: false})
  }, []);
  
  return (
    <UIModal id={MESSAGE_BOX}>
      <DialogLayout
        message={messageBox?.params?.message ?? ''}
        type={messageBox?.params?.type ?? DialogType.INFO}
        onClose={handleOnClose}
      >
        <UIButton onAction={handleOnClose}> Confirmar </UIButton>
      </DialogLayout>
    </UIModal>
  );
};

export default MessageBox;