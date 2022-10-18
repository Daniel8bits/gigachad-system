
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import ComponentStore, { 
    ComponentStoreData, 
    ComponentStoreState 
} from '@store/components/ComponentStore'

export interface ModalData extends ComponentStoreData {
    open: boolean, 
    params?: any
}

const initialState: ComponentStoreState = {
    modal: {}
}

const ModalStore = createSlice(new ComponentStore('modal', initialState))

export type ModalState = typeof initialState
export const ModalActions = {...ModalStore.actions}
export default ModalStore.reducer