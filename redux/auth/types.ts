import { EnumAuthContext } from '@constants/auth-context';
import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export interface IDialogInitialState {
    context: EnumAuthContext;
    isOpen: boolean;
}

const DialogInitialState: IDialogInitialState = {
    context: EnumAuthContext.LOGIN,
    isOpen: true,
};

export type IAuthState = {
    login: IBasicInitialState;
    signup: IBasicInitialState;
    dialog: IDialogInitialState;
};

export const authInitialState: IAuthState = {
    login: BasicInitialState,
    signup: BasicInitialState,
    dialog: DialogInitialState,
};
