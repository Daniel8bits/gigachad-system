import { PopOverData, PopOverActions } from "@store/components/PopOverStore";
import { useDispatch, useSelector } from "@store/Root.store";

type UseModalReturnType = [PopOverData, (value: PopOverData) => void]

function usePopOver(key: string): UseModalReturnType {
    const dispatch = useDispatch()
    const data = useSelector(state => state.popOver.popOver)[key]
    return [
        data as PopOverData,
        (value: PopOverData) => dispatch(PopOverActions.update({key, value}))
    ]
}

export default usePopOver;