import { authSlice } from '.';
import api from 'services/axios';
import { AppDispatch } from '@redux/store';
import { IUnknownObject } from '@interfaces/app';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';

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
