import useModal from '@hooks/useModal';
import DialogLayout, { DialogType } from '@layouts/dialogLayout/DialogLayout';
import UIButton from '@ui/button/UIButton';
import UIModal from '@ui/modal/UIModal';
import React, { useCallback } from 'react';

const DIALOG_BOX = "DIALOG_BOX"

export interface DialogBoxParams {
  message: string
  type: DialogType
  onConfirm: () => void
  onCancel?: () => void
}

export function useDialogBox() {
  return useModal<DialogBoxParams>(DIALOG_BOX)
}

interface DialogBoxProps {

}

const DialogBox: React.FC<DialogBoxProps> = () => {
  const [dialogBox, updateDialogBox] = useDialogBox()

  const handleOnConfirm = useCallback(() => {
    dialogBox?.params?.onConfirm()
    updateDialogBox({ open: false })
  }, [dialogBox]);

  const handleOnCancel = useCallback(() => {
    dialogBox?.params?.onCancel?.()
    updateDialogBox({ open: false })
  }, [dialogBox]);

  return (
    <UIModal id={DIALOG_BOX}>
      <DialogLayout
        message={dialogBox?.params?.message ?? ''}
        type={dialogBox?.params?.type ?? DialogType.INFO}
        onClose={handleOnCancel}
      >
        <UIButton onAction={handleOnConfirm}> Confirmar </UIButton>
        <UIButton onAction={handleOnCancel}> Cancelar </UIButton>
      </DialogLayout>
    </UIModal>
  );
};

export default DialogBox;