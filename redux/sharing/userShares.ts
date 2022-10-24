import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getSharesByUserAction = createAsyncThunk('sharings/userShares', async (_, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get('/shares/user');
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getSharesByUserAction;
