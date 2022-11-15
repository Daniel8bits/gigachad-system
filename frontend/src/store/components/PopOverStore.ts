
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import ComponentStore, { 
    ComponentStoreData, 
    ComponentStoreState 
} from '@store/components/ComponentStore'

export interface PopOverData extends ComponentStoreData {
    open: boolean, 
    params?: any
}

const initialState: ComponentStoreState = {
    popOver: {}
}

const PopOverStore = createSlice(new ComponentStore('popOver', initialState))

export type PopOverState = typeof initialState

export const PopOverActions = {...PopOverStore.actions}
export default PopOverStore.reducer