import api from 'services/axios';
import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authSlice } from '.';
import { IUnknownObject } from '@interfaces/app';

interface IParams {
    oldPassword: string;
    newPassword: string;
}

export const resetChangePasswordAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(authSlice.actions.clear({ context: 'auth/changePassword' }));
    };

const changePasswordAction = createAsyncThunk('auth/changePassword', async (params: IParams, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.put('/auth/update/password', params);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default changePasswordAction;
