import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { storySlice } from '.';
import api from 'services/axios';
import { AppDispatch } from '@redux/store';
import { IUnknownObject } from '@interfaces/app';

export const resetStoryAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(storySlice.actions.clear({ context: 'story/all' }));
    };

const getAllStoryAction = createAsyncThunk('story/all', async (_, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get('/promotions/story');
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAllStoryAction;
