import {PayloadAction} from '@reduxjs/toolkit'

export type ComponentStoreData = {[key: string]: unknown}
export interface ComponentStoreDataMutation {
    key: string, 
    value: ComponentStoreData
}

export interface ComponentStoreState {
    [key: string]: {[key: string]: ComponentStoreData}
}

class ComponentStore {
    public name: string
    public initialState: ComponentStoreState
    public reducers!: {[key: string]: (state: ComponentStoreState, action:PayloadAction<any>) => void}
    
    constructor(name: string, initialState: ComponentStoreState) {
        this.name = name;
        this.initialState = initialState;
        this.setReducers()
    }

    private setReducers() {
        this.reducers = {
            create: (state: ComponentStoreState, action:PayloadAction<ComponentStoreDataMutation>) => {
                const key = action.payload.key
                const value = action.payload.value
                if(state[this.name][key]) {
                    throw new Error(`${this.getComponentName()} '${key}' already exists!`)
                }
                state[this.name][key] = value
            },
            update: (state: ComponentStoreState, action:PayloadAction<ComponentStoreDataMutation>) => {
                const key = action.payload.key
                const value = action.payload.value
                if(!state[this.name][key]) {
                    throw new Error(`${this.getComponentName()} '${key}' does not exists!`)
                }
                state[this.name][key] = value
            },
            destroy: (state: ComponentStoreState, action:PayloadAction<string>) => {
                const key = action.payload
                if(!state[this.name][key]) {
                    throw new Error(`${this.getComponentName()} '${key}' does not exists!`)
                }
                delete state[this.name][key]
            }
        }
    }

    private getComponentName(): string {
        return this.name[0].toUpperCase() + this.name.substring(1, this.name.length-1)
    }
}

export default ComponentStore