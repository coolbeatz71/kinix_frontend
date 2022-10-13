import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';

interface IParams {
    slug?: string;
    title: string;
    videoId: number;
}

const addVideoToPlaylistAction = createAsyncThunk('playlists/add', async (params: IParams, { rejectWithValue }) => {
    const { slug, videoId, title } = params;
    try {
        const { data } = await api.post(
            '/playlists',
            {
                title,
                videoId,
            },
            { params: { slug } },
        );
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default addVideoToPlaylistAction;
