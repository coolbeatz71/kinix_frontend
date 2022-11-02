import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getAllPlaylistsAction = createAsyncThunk('playlists/all', async (_, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get('/playlists');
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAllPlaylistsAction;
