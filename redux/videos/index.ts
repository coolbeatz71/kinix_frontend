import {
    ActionWrapperReset,
    ActionWrapperPending,
    ActionWrapperFulfilled,
    ActionWrapperRejected,
} from '@constants/redux';
import { createSlice } from '@reduxjs/toolkit';
import getVideosFeedAction from './feed';
import { videosInitialState } from './types';

export const videosSlice = createSlice({
    name: 'videos',
    initialState: videosInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // get videos feed
            .addCase(getVideosFeedAction.pending, ActionWrapperPending)
            .addCase(getVideosFeedAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getVideosFeedAction.rejected, ActionWrapperRejected);
    },
});

const videosReducer = videosSlice.reducer;
export default videosReducer;
