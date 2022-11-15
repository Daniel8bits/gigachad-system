
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import ComponentStore, { 
    ComponentStoreData, 
    ComponentStoreState 
} from '@store/components/ComponentStore'

export interface CustomTagData extends ComponentStoreData {
    defined: boolean, 
    params?: any
}

const initialState: ComponentStoreState = {
    customTag: {}
}

const CustomTagStore = createSlice(new ComponentStore('customTag', initialState))

export type CustomTagState = typeof initialState
export const CustomTagActions = {...CustomTagStore.actions}
export default CustomTagStore.reducer