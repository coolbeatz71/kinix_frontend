import { EnumAuthContext } from '@constants/auth-context';
import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export interface IDialogInitialState {
    isOpen: boolean;
    context: EnumAuthContext;
}

const DialogInitialState: IDialogInitialState = {
    isOpen: false,
    context: EnumAuthContext.LOGIN,
};

export type IAuthState = {
    login: IBasicInitialState;
    logout: IBasicInitialState;
    signup: IBasicInitialState;
    dialog: IDialogInitialState;
    confirm: IBasicInitialState;
    resendOtp: IBasicInitialState;
    socialLogin: IBasicInitialState;
    updateAvatar: IBasicInitialState;
    updateAccount: IBasicInitialState;
    changePassword: IBasicInitialState;
    forgotPassword: IBasicInitialState;
    resetPassword: IBasicInitialState;
};

export const authInitialState: IAuthState = {
    login: BasicInitialState,
    logout: BasicInitialState,
    signup: BasicInitialState,
    dialog: DialogInitialState,
    confirm: BasicInitialState,
    resendOtp: BasicInitialState,
    socialLogin: BasicInitialState,
    updateAvatar: BasicInitialState,
    updateAccount: BasicInitialState,
    changePassword: BasicInitialState,
    forgotPassword: BasicInitialState,
    resetPassword: BasicInitialState,
};
