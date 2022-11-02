import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { sharingSlice } from '.';
import api from 'services/axios';
import { AppDispatch } from '@redux/store';
import { IUnknownObject } from '@interfaces/app';

export const resetAddVideoSharingAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(sharingSlice.actions.clear({ context: 'sharings/add' }));
    };

const addVideoSharingAction = createAsyncThunk('sharings/add', async (slug: string, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.post(`/shares/${slug}`);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default addVideoSharingAction;
