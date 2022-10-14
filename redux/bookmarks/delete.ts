import api from 'services/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUnknownObject } from '@interfaces/app';

const removeArticleBookmarkAction = createAsyncThunk('bookmarks/delete', async (slug: string, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.delete(`/bookmarks/${slug}`);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default removeArticleBookmarkAction;
