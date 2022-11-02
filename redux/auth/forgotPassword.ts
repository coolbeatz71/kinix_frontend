import api from 'services/axios';
import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authSlice } from '.';
import { IUnknownObject } from '@interfaces/app';

interface IParams {
    email: string;
}

export const resetForgotPasswordAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(authSlice.actions.clear({ context: 'auth/forgotPassword' }));
    };

const forgotPasswordAction = createAsyncThunk('auth/forgotPassword', async (params: IParams, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.post('/auth/forgot-password', params);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default forgotPasswordAction;
