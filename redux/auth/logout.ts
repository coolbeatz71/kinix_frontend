import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { AppDispatch, persistor } from 'redux/store';
import { API_TOKEN, USER_DATA } from '@constants/platform';
import { IUnknownObject } from '@interfaces/app';
import { authSlice } from '.';
import { userSlice } from '@redux/user';

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

        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default logoutAction;
