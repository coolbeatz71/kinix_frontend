import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getPopularArticlesAction = createAsyncThunk('articles/popular', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/articles/popular');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getPopularArticlesAction;
