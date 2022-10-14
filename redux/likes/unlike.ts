import api from 'services/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUnknownObject } from '@interfaces/app';

const removeArticleLikeAction = createAsyncThunk('likes/unlike', async (slug: string, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.delete(`/likes/${slug}`);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default removeArticleLikeAction;
