import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

interface IParams {
    tag?: string;
    page?: number;
    limit?: number;
    search?: string;
}

const getAllArticlesAction = createAsyncThunk('articles/all', async (params: IParams, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/articles', {
            params,
        });
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAllArticlesAction;
