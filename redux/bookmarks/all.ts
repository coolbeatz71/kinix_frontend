import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getArticleBookmarksAction = createAsyncThunk('bookmarks/all', async (slug: string, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/bookmarks/${slug}`);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getArticleBookmarksAction;
