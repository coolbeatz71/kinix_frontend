import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ISignUpData } from '@interfaces/auth';
import api from 'services/axios';
import { authSlice } from '.';
import { AppDispatch } from 'redux/store';
import { IUnknownObject } from '@interfaces/app';

export const resetSignUpAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(authSlice.actions.clear({ context: 'auth/signup' }));
    };

const signUpAction = createAsyncThunk('auth/signup', async (params: ISignUpData, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.post('/auth/signup', params);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default signUpAction;
