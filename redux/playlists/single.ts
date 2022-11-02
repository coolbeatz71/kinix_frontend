import { IUnknownObject } from '@interfaces/app';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

const getSinglePlaylistAction = createAsyncThunk('playlists/single', async (slug: string, { rejectWithValue }) => {
    try {
        const response: IUnknownObject = await api.get(`/playlists/${slug}`);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default getSinglePlaylistAction;
