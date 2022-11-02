import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getArticleLikesAction = createAsyncThunk('likes/all', async (slug: string, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get(`/likes/${slug}`);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getArticleLikesAction;
