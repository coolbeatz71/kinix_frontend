import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getSingleVideoRatedByUserAction = createAsyncThunk(
    'ratings/single',
    async (slug: string, { rejectWithValue }) => {
        try {
            const response: IUnknownObject = await api.get(`/rates/user/${slug}`);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default getSingleVideoRatedByUserAction;
