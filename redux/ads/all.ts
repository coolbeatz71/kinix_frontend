import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getAllAdsAction = createAsyncThunk('ads/all', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/promotions/ads');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAllAdsAction;
