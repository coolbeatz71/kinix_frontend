import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getPopularVideosAction = createAsyncThunk('videos/popular', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/videos/popular');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getPopularVideosAction;
