import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { RELATED_CONTENT_LIMIT } from '@constants/app';
import { IUnknownObject } from '@interfaces/app';

export interface IParams {
    slug: string;
    tags: string[] | null;
}

const getRelatedArticlesAction = createAsyncThunk('articles/related', async (params: IParams, { rejectWithValue }) => {
    const { slug, tags } = params;
    try {
        const response: IUnknownObject = await api.get(`/articles/related/${slug}`, {
            params: { tags: tags?.join(','), limit: RELATED_CONTENT_LIMIT },
        });
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getRelatedArticlesAction;
