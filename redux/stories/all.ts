import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { IUnknownObject } from '@interfaces/app';

const getAllStoryAction = createAsyncThunk('story/all', async (_, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get('/promotions/story');
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAllStoryAction;
