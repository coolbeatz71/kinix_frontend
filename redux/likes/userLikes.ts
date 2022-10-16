import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getUserLikesAction = createAsyncThunk('likes/user', async (_, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get('/likes/user');
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getUserLikesAction;
