import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getArticlesTagsAction = createAsyncThunk('articles/tags', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/articles/tags');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getArticlesTagsAction;
