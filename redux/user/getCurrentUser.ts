import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { verifyToken } from '@helpers/getToken';
import { IUnknownObject } from '@interfaces/app';

const getCurrentUserAction = createAsyncThunk('users/currentUser', async (_, { rejectWithValue }) => {
    const token = verifyToken();
    if (token) {
        try {
            const response: IUnknownObject = await api.get('/auth/user');
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
});

export default getCurrentUserAction;
