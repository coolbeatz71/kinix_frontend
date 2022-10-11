import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getUserLikesAction = createAsyncThunk('likes/user', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/likes/user');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getUserLikesAction;
