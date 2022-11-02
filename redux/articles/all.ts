import { IUnknownObject } from '@interfaces/app';
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
        const response: IUnknownObject = await api.get('/articles', {
            params,
        });
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAllArticlesAction;
