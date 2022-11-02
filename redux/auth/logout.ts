import { createAsyncThunk } from '@reduxjs/toolkit';
import { authSlice } from '.';
import api from 'services/axios';
import { userSlice } from '@redux/user';
import { IUnknownObject } from '@interfaces/app';
import { AppDispatch, persistor } from 'redux/store';
import { API_TOKEN, USER_DATA } from '@constants/platform';

const logoutAction = createAsyncThunk('auth/logout', async (params: { dispatch: AppDispatch }, { rejectWithValue }) => {
    const { dispatch } = params;
    try {
        const response: IUnknownObject = await api.delete('/auth/signout');

        dispatch(authSlice.actions.clear({ context: 'auth/login' }));
        dispatch(authSlice.actions.clear({ context: 'auth/logout' }));
        dispatch(userSlice.actions.clear({ context: 'user/currentUser' }));

        persistor.purge();
        localStorage.removeItem(USER_DATA);
        localStorage.removeItem(API_TOKEN);

        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default logoutAction;
