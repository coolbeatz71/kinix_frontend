import { IUnknownObject } from '@interfaces/app';
import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { authSlice } from '.';

interface IParams {
    credential: string;
}

export const resetResendOTPAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(authSlice.actions.clear({ context: 'auth/resendOtp' }));
    };

const resendOTPAction = createAsyncThunk('auth/resendOtp', async (params: IParams, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.post('/auth/resend-otp', params);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default resendOTPAction;
