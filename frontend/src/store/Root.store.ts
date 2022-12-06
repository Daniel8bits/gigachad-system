import { configureStore } from "@reduxjs/toolkit";
import {
    TypedUseSelectorHook,
    useDispatch as useUntypedDispatch, 
    useSelector as useUntypedSelector
} from 'react-redux'

import ModalReducer from '@store/components/ModalStore'
import PopOverReducer from '@store/components/PopOverStore'
import AuthReducer from '@store/AuthStore'
import PageReducer from '@store/PageStore'

const RootStore = configureStore({
    reducer: {
        modal: ModalReducer,
        popOver: PopOverReducer,
        auth: AuthReducer,
        page: PageReducer
    }
})

export type RootState = ReturnType<typeof RootStore.getState>

export const useDispatch = () => useUntypedDispatch<typeof RootStore.dispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useUntypedSelector

export default RootStore
