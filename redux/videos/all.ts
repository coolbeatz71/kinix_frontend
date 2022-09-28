import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

interface IParams {
    page?: number;
    tag?: string;
    limit?: number;
    search?: string;
    category?: string;
}

const getAllVideosAction = createAsyncThunk('videos/all', async (params: IParams, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/videos', { params });
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAllVideosAction;
