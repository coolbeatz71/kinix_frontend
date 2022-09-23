import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getFeaturedArticlesAction = createAsyncThunk('articles/featured', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/articles/featured');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getFeaturedArticlesAction;
