import { AppDispatch } from 'redux/store';
import { IDialogInitialState } from './types';
import { authSlice } from '.';

type IShowDialogPayload = IDialogInitialState;

export const showAuthDialogAction =
    (payload: IShowDialogPayload) =>
    (dispatch: AppDispatch): unknown => {
        return dispatch(authSlice.actions.showDialog(payload));
    };
