import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

interface IParams {
    q: string;
    tag?: string;
}

const searchContentAction = createAsyncThunk('search/all', async (params: IParams, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get('/contents/search', {
            params,
        });
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default searchContentAction;
