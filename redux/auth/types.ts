import { EnumAuthContext } from '@constants/auth-context';
import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export interface IDialogInitialState {
    context: EnumAuthContext;
    isOpen: boolean;
}

const DialogInitialState: IDialogInitialState = {
    context: EnumAuthContext.LOGIN,
    isOpen: false,
};

export type IAuthState = {
    login: IBasicInitialState;
    logout: IBasicInitialState;
    signup: IBasicInitialState;
    dialog: IDialogInitialState;
    confirm: IBasicInitialState;
    resendOtp: IBasicInitialState;
    updateAvatar: IBasicInitialState;
    updateAccount: IBasicInitialState;
    changePassword: IBasicInitialState;
};

export const authInitialState: IAuthState = {
    login: BasicInitialState,
    logout: BasicInitialState,
    signup: BasicInitialState,
    dialog: DialogInitialState,
    confirm: BasicInitialState,
    resendOtp: BasicInitialState,
    updateAvatar: BasicInitialState,
    updateAccount: BasicInitialState,
    changePassword: BasicInitialState,
};
