import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getSinglePlaylistAction = createAsyncThunk('playlists/single', async (slug: string, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/playlists/${slug}`);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getSinglePlaylistAction;
