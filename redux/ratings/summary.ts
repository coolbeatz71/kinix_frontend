import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getSingleVideoRateSummaryAction = createAsyncThunk(
    'ratings/summary',
    async (slug: string, { rejectWithValue }) => {
        try {
            const response: IUnknownObject = await api.get(`/rates/summary/${slug}`);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default getSingleVideoRateSummaryAction;
