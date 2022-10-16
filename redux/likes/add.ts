import api from 'services/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUnknownObject } from '@interfaces/app';

const addArticleLikeAction = createAsyncThunk('likes/add', async (slug: string, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.post(`/likes/${slug}`);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default addArticleLikeAction;
