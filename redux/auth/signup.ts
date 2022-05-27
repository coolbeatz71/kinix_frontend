import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ISignUpData } from '@interfaces/auth';
import api from 'services/axios';
import { authSlice } from '.';
import { AppDispatch } from 'redux/store';

export const resetSignUpAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(authSlice.actions.clear({ context: 'auth/signup' }));
    };

const signUpAction = createAsyncThunk('auth/signup', async (params: ISignUpData, { rejectWithValue }) => {
    try {
        const { data } = await api.post('/auth/signup', params);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default signUpAction;
