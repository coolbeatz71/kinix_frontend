import api from 'services/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const removeArticleBookmarkAction = createAsyncThunk('bookmarks/delete', async (slug: string, { rejectWithValue }) => {
    try {
        const { data } = await api.delete(`/bookmarks/${slug}`);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default removeArticleBookmarkAction;
