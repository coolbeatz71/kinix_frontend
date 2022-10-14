import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

export interface IParams {
    slug: string;
    page?: number;
    limit?: number;
}

const getAllArticleCommentsAction = createAsyncThunk('comments/all', async (params: IParams, { rejectWithValue }) => {
    const { page, limit, slug } = params;
    try {
        const response: IUnknownObject = await api.get(`/comments/${slug}`, {
            params: {
                page,
                limit,
            },
        });
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAllArticleCommentsAction;
