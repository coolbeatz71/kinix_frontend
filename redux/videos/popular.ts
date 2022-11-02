import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getPopularVideosAction = createAsyncThunk('videos/popular', async (_, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get('/videos/popular');
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getPopularVideosAction;
