import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

interface IParams {
    slug: string;
}

const getSingleVideoAction = createAsyncThunk('videos/single', async (params: IParams, { rejectWithValue }) => {
    const { slug } = params;
    try {
        const { data } = await api.get(`/videos/${slug}`);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getSingleVideoAction;
