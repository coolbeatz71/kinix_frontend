import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { authSlice } from '.';
import { AppDispatch } from 'redux/store';
import { IUnknownObject } from '@interfaces/app';
import { isServer } from '@constants/app';
import setAuthCookies from '@helpers/cookies';
import { API_TOKEN } from '@constants/platform';
import { setLocalUserData } from '@helpers/getLocalUserData';
import setCurrentUserAction from '@redux/user/setCurrentUser';

interface IParams {
    dispatch: AppDispatch;
    data: {
        otp: string;
        credential: string;
    };
}

export const resetConfirmAccountAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(authSlice.actions.clear({ context: 'auth/confirm' }));
    };

const confirmAccountAction = createAsyncThunk('auth/confirm', async (params: IParams, { rejectWithValue }) => {
    const { data, dispatch } = params;
    try {
        const response: IUnknownObject = await api.post('/auth/confirm', data);

        setAuthCookies(response.token);
        setLocalUserData(response.data);
        dispatch(setCurrentUserAction(response));
        !isServer && localStorage.setItem(API_TOKEN, response.token);
        api.defaults.headers.Authorization = `Bearer ${response.token}`;

        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default confirmAccountAction;
