import { ModalData, ModalActions } from "@store/components/ModalStore";
import { useDispatch, useSelector } from "@store/Root.store";

type UseModalReturnType = [ModalData, (value: ModalData) => void]

function useModal(key: string): UseModalReturnType {
    const dispatch = useDispatch()
    const data = useSelector(state => state.modal.modal)[key]
    return [
        data as ModalData,
        (value: ModalData) => dispatch(ModalActions.update({key, value}))
    ]
}

export default useModal;