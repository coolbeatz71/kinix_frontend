import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authSlice } from '.';
import api from 'services/axios';
import { AppDispatch } from 'redux/store';
import { isServer } from '@constants/app';
import setAuthCookies from '@helpers/cookies';
import { API_TOKEN } from '@constants/platform';
import { IUnknownObject } from '@interfaces/app';
import { ISocialLoginData } from '@interfaces/auth';
import setCurrentUserAction from 'redux/user/setCurrentUser';
import { setLocalUserData } from '@helpers/getLocalUserData';

export const resetSocialLoginAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(authSlice.actions.clear({ context: 'auth/socialLogin' }));
    };
interface IParams {
    data: ISocialLoginData;
    dispatch: AppDispatch;
}

const socialLoginAction = createAsyncThunk('auth/socialLogin', async (params: IParams, { rejectWithValue }) => {
    const { data, dispatch } = params;
    try {
        const response: IUnknownObject = await api.post('/auth/social-login', data);

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

export default socialLoginAction;
