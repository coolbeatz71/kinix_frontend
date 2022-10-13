import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { playlistsSlice } from '.';

export const resetDeletePlaylistAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(playlistsSlice.actions.clear({ context: 'playlists/delete' }));
    };

const deletePlaylistAction = createAsyncThunk('playlists/delete', async (slug: string, { rejectWithValue }) => {
    try {
        const { data } = await api.delete(`/playlists/${slug}`);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export default deletePlaylistAction;
