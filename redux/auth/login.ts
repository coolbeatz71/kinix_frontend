import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { authSlice } from '.';
import { AppDispatch } from 'redux/store';
import { isServer } from '@constants/app';
import { ILoginData } from '@interfaces/auth';
import setAuthCookies from '@helpers/cookies';
import { API_TOKEN } from '@constants/platform';
import { IUnknownObject } from '@interfaces/app';
import setCurrentUserAction from 'redux/user/setCurrentUser';
import { setLocalUserData } from '@helpers/getLocalUserData';

export const resetLoginAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(authSlice.actions.clear({ context: 'auth/login' }));
    };
interface IParams {
    data: ILoginData;
    dispatch: AppDispatch;
}

const loginAction = createAsyncThunk('auth/login', async (params: IParams, { rejectWithValue }) => {
    const { data, dispatch } = params;
    try {
        const response: IUnknownObject = await api.post('/auth/login', data);

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

export default loginAction;
