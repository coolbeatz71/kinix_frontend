import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getArticlesTagsAction = createAsyncThunk('articles/tags', async (_, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get('/articles/tags');
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getArticlesTagsAction;
