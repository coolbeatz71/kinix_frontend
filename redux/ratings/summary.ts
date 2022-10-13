import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getSingleVideoRateSummaryAction = createAsyncThunk(
    'ratings/summary',
    async (slug: string, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/rates/summary/${slug}`);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default getSingleVideoRateSummaryAction;
