import api from 'services/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const addArticleBookmarkAction = createAsyncThunk('bookmarks/add', async (slug: string, { rejectWithValue }) => {
    try {
        const { data } = await api.post(`/bookmarks/${slug}`);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default addArticleBookmarkAction;
