import { ratingsSlice } from '.';
import api from 'services/axios';
import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IUnknownObject } from '@interfaces/app';

interface IParams {
    slug: string;
    count: number;
}

export const resetAddVideoRatingAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(ratingsSlice.actions.clear({ context: 'ratings/add' }));
    };

const addVideoRatingAction = createAsyncThunk('ratings/add', async (params: IParams, { rejectWithValue }) => {
    const { count, slug } = params;
    try {
        const response: IUnknownObject = await api.post(`/rates/${slug}`, {
            count,
        });
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default addVideoRatingAction;
