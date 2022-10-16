import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getAllAdsAction = createAsyncThunk('ads/all', async (_, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get('/promotions/ads');
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAllAdsAction;
