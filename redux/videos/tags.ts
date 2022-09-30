import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getVideosTagsAction = createAsyncThunk('videos/tags', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/videos/tags');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getVideosTagsAction;
