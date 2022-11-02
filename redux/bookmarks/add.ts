import api from 'services/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUnknownObject } from '@interfaces/app';

const addArticleBookmarkAction = createAsyncThunk('bookmarks/add', async (slug: string, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.post(`/bookmarks/${slug}`);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default addArticleBookmarkAction;
