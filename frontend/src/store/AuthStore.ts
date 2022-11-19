import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Roles from '@utils/enums/Roles';
import { IUser } from 'gigachad-shareds/models';
import axios from '@utils/axios';

enum UserType {
    user = 0,
    customer = 2,
    employee = 4,
    attendant = 8,
    manager = 16,
    financer = 32,
    trainer = 64
}

interface IUserAuth extends IUser{
    type: UserType
}

export interface AuthAccount {
    user: IUserAuth
    token?: string
}

interface AuthStoreState {
    signedIn: boolean
    account?: IUserAuth
    role?: Roles
}

const initialState: AuthStoreState = {
    signedIn: false,
}

const UserTypeToRole: Record<UserType, Roles> = {
    [UserType.user]: Roles.CUSTOMER,
    [UserType.employee]: Roles.ATTENDANT,
    [UserType.customer]: Roles.CUSTOMER,
    [UserType.attendant]: Roles.ATTENDANT,
    [UserType.trainer]: Roles.TRAINER,
    [UserType.manager]: Roles.MANAGER,
    [UserType.financer]: Roles.FINANCIER
}

const AuthStore = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state: AuthStoreState, action: PayloadAction<AuthAccount>) => {
            state.signedIn = true;
            state.account = action.payload.user;
            const token = action.payload.token;
            if (token) {
                localStorage.setItem("Token_Auth", token);
                axios.defaults.headers.common.Authorization = token;
            }
                console.log(state.account);
            if (state.account.type) state.role = UserTypeToRole[state.account.type];
        },
        signOut: (state: AuthStoreState) => {
            state.signedIn = false;
        }
    }
})

export const { signIn, signOut } = AuthStore.actions
export default AuthStore.reducer