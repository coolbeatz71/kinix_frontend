import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getUserBookmarksAction = createAsyncThunk('bookmarks/user', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/bookmarks/user');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getUserBookmarksAction;
