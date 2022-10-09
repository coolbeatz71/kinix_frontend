import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { RELATED_CONTENT_LIMIT } from '@constants/app';

export interface IParams {
    slug: string;
    tags: string[] | null;
}

const getRelatedVideosAction = createAsyncThunk('videos/related', async (params: IParams, { rejectWithValue }) => {
    const { slug, tags } = params;
    try {
        const { data } = await api.get(`/videos/related/${slug}`, {
            params: { tags: tags?.join(','), limit: RELATED_CONTENT_LIMIT },
        });
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getRelatedVideosAction;
