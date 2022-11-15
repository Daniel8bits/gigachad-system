import { ModalData, ModalActions } from "@store/components/ModalStore";
import { useDispatch, useSelector } from "@store/Root.store";

type UseModalReturnType<T> = [ModalData<T>, (value: ModalData<T>) => void]

function useModal<T>(key: string): UseModalReturnType<T> {
    const dispatch = useDispatch()
    const data = useSelector(state => state.modal.modal)[key]
    return [
        data as ModalData<T>,
        (value: ModalData<T>) => dispatch(ModalActions.update({key, value}))
    ]
}

export default useModal;