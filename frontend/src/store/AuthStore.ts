import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Roles from '@utils/enums/Roles';

interface AuthStoreState {
    signedIn: boolean
    role?: Roles
}

const initialState: AuthStoreState = {
    signedIn: false,
}

const AuthStore = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state: AuthStoreState, action: PayloadAction<Roles>) => {
            state.signedIn = true;
            state.role = action.payload
        },
        signOut: (state: AuthStoreState) => {
            state.signedIn = false;
        }
    }
})

export const {signIn, signOut} = AuthStore.actions
export default AuthStore.reducer