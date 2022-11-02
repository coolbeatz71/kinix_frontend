import api from 'services/axios';
import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authSlice } from '.';
import { IUnknownObject } from '@interfaces/app';
import { setLocalUserData } from '@helpers/getLocalUserData';
import setCurrentUserAction from '@redux/user/setCurrentUser';

interface IParams {
    dispatch: AppDispatch;
    data: {
        email?: string | null;
        userName?: string | null;
        countryName?: string | null;
        countryFlag?: string | null;
        phonePartial?: string | null;
        phoneISOCode?: string | null;
        phoneDialCode?: string | null;
    };
}

export const resetUpdateAccountAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(authSlice.actions.clear({ context: 'auth/updateAccount' }));
    };

const updateAccountAction = createAsyncThunk('auth/updateAccount', async (params: IParams, { rejectWithValue }) => {
    const { data, dispatch } = params;
    try {
        const response: IUnknownObject = await api.put('/auth/update', data);
        setLocalUserData(response.data);
        dispatch(setCurrentUserAction(response));

        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default updateAccountAction;
