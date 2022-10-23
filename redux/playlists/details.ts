import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getAllPlaylistsDetailsAction = createAsyncThunk('playlists/details', async (_, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get('/playlists/details');
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getAllPlaylistsDetailsAction;
