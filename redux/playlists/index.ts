import { createSlice } from '@reduxjs/toolkit';
import {
    ActionWrapperReset,
    ActionWrapperPending,
    ActionWrapperFulfilled,
    ActionWrapperRejected,
} from '@constants/redux';
import getAllPlaylistsAction from './all';
import deletePlaylistAction from './delete';
import getSinglePlaylistAction from './single';
import { playlistsInitialState } from './types';
import removeVideoFromPlaylistAction from './removeVideo';
import addVideoToPlaylistAction from './add';

export const playlistsSlice = createSlice({
    name: 'playlists',
    initialState: playlistsInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // delete a playlist
            .addCase(deletePlaylistAction.pending, ActionWrapperPending)
            .addCase(deletePlaylistAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deletePlaylistAction.rejected, ActionWrapperRejected)
            // get all playlists
            .addCase(getAllPlaylistsAction.pending, ActionWrapperPending)
            .addCase(getAllPlaylistsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllPlaylistsAction.rejected, ActionWrapperRejected)
            // get a single playlist
            .addCase(getSinglePlaylistAction.pending, ActionWrapperPending)
            .addCase(getSinglePlaylistAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getSinglePlaylistAction.rejected, ActionWrapperRejected)
            // remove a video from a playlist
            .addCase(removeVideoFromPlaylistAction.pending, ActionWrapperPending)
            .addCase(removeVideoFromPlaylistAction.fulfilled, ActionWrapperFulfilled)
            .addCase(removeVideoFromPlaylistAction.rejected, ActionWrapperRejected)
            // create a playlist and add video
            .addCase(addVideoToPlaylistAction.pending, ActionWrapperPending)
            .addCase(addVideoToPlaylistAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addVideoToPlaylistAction.rejected, ActionWrapperRejected);
    },
});

const playlistsReducer = playlistsSlice.reducer;
export default playlistsReducer;
