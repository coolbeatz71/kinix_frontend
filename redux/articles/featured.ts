import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

interface IParams {
    limit?: number;
}

const getFeaturedArticlesAction = createAsyncThunk(
    'articles/featured',
    async ({ limit = 5 }: IParams, { rejectWithValue }) => {
        try {
            const response: IUnknownObject = await api.get('/articles/featured', { params: { limit } });
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default getFeaturedArticlesAction;
