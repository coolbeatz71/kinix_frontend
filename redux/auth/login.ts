import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginData } from '@interfaces/auth';
import api from 'services/axios';

export interface ILoginActionPayload {
    data: ILoginData;
}

const loginAction = createAsyncThunk('auth/login', async ({ data }: ILoginActionPayload, { rejectWithValue }) => {
    try {
        const { data: response } = await api.post('/auth/login', data);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default loginAction;
