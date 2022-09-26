import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getVideosFeedAction = createAsyncThunk('videos/feed', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/videos/feed');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getVideosFeedAction;
