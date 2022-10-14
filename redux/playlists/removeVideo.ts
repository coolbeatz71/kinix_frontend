import { IUnknownObject } from '@interfaces/app';
import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { playlistsSlice } from '.';

interface IParams {
    slug: string;
    videoId: number;
}

export const resetRemoveVideoFromPlaylistAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(playlistsSlice.actions.clear({ context: 'playlists/removeVideo' }));
    };

const removeVideoFromPlaylistAction = createAsyncThunk(
    'playlists/removeVideo',
    async (params: IParams, { rejectWithValue }) => {
        const { slug, videoId } = params;
        try {
            const response: IUnknownObject = await api.delete(`/playlists/${slug}`, { data: { videoId } });
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default removeVideoFromPlaylistAction;
