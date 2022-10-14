import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getVideoSharingsAction = createAsyncThunk('sharings/all', async (slug: string, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get(`/shares/${slug}`);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getVideoSharingsAction;
