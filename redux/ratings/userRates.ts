import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getRatesByUserAction = createAsyncThunk('ratings/userRates', async (_, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get('/rates/user');
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getRatesByUserAction;
