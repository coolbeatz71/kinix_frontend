import { createSlice } from '@reduxjs/toolkit';
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from '@constants/redux';
import { videoSharingInitialState } from './types';
import addVideoSharingAction from './add';
import getVideoSharingsAction from './all';
import getSharesByUserAction from './userShares';

export const sharingSlice = createSlice({
    name: 'sharings',
    initialState: videoSharingInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // save a video share
            .addCase(addVideoSharingAction.pending, ActionWrapperPending)
            .addCase(addVideoSharingAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addVideoSharingAction.rejected, ActionWrapperRejected)
            // get all sharings for a single video
            .addCase(getVideoSharingsAction.pending, ActionWrapperPending)
            .addCase(getVideoSharingsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getVideoSharingsAction.rejected, ActionWrapperRejected)
            // get video shares by a user
            .addCase(getSharesByUserAction.pending, ActionWrapperPending)
            .addCase(getSharesByUserAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getSharesByUserAction.rejected, ActionWrapperRejected);
    },
});

const sharingReducer = sharingSlice.reducer;
export default sharingReducer;
