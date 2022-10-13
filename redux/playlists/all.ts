import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getAllPlaylistsAction = createAsyncThunk('playlists/all', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get('/playlists');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAllPlaylistsAction;
