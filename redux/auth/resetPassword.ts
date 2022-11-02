import api from 'services/axios';
import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authSlice } from '.';
import { IUnknownObject } from '@interfaces/app';

interface IParams {
    otp: string;
    email: string;
    newPassword: string;
}

export const resetResetPasswordAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(authSlice.actions.clear({ context: 'auth/resetPassword' }));
    };

const resetPasswordAction = createAsyncThunk('auth/resetPassword', async (params: IParams, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.post('/auth/reset-password', params);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default resetPasswordAction;
