import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import getToken from '@helpers/getToken';

const getCurrentUserAction = createAsyncThunk('user/currentUser', async (_, { rejectWithValue }) => {
    const token = getToken();

    if (token) {
        try {
            const { data } = await api.get('/auth/user');
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
});

export default getCurrentUserAction;
