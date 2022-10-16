import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getVideosFeedAction = createAsyncThunk('videos/feed', async (_, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get('/videos/feed');
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getVideosFeedAction;
