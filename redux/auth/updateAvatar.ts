import api from 'services/axios';
import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authSlice } from '.';
import { IUnknownObject } from '@interfaces/app';
import { setLocalUserData } from '@helpers/getLocalUserData';
import setCurrentUserAction from '@redux/user/setCurrentUser';

interface IParams {
    avatar: string;
    dispatch: AppDispatch;
}

export const resetUpdateAvatarAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(authSlice.actions.clear({ context: 'auth/updateAvatar' }));
    };

const updateAvatarAction = createAsyncThunk('auth/updateAvatar', async (params: IParams, { rejectWithValue }) => {
    const { avatar, dispatch } = params;

    try {
        const response: IUnknownObject = await api.put('/auth/update/avatar', {
            avatar,
        });
        setLocalUserData(response.data);
        dispatch(setCurrentUserAction(response));

        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default updateAvatarAction;
