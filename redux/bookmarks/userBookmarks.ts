import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getUserBookmarksAction = createAsyncThunk('bookmarks/user', async (_, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get('/bookmarks/user');
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getUserBookmarksAction;
