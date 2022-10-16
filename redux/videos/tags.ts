import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getVideosTagsAction = createAsyncThunk('videos/tags', async (_, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get('/videos/tags');
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getVideosTagsAction;
