import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getPopularArticlesAction = createAsyncThunk('articles/popular', async (_, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get('/articles/popular');
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getPopularArticlesAction;
