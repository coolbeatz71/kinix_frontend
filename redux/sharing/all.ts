import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getVideoSharingsAction = createAsyncThunk('sharings/all', async (slug: string, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/shares/${slug}`);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getVideoSharingsAction;
