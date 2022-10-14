import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getArticleBookmarksAction = createAsyncThunk('bookmarks/all', async (slug: string, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get(`/bookmarks/${slug}`);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getArticleBookmarksAction;
