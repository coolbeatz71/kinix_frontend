import {
    ActionWrapperReset,
    ActionWrapperPending,
    ActionWrapperFulfilled,
    ActionWrapperRejected,
} from '@constants/redux';
import { createSlice } from '@reduxjs/toolkit';
import getAllVideosAction from './all';
import getVideosFeedAction from './feed';
import getPopularVideosAction from './popular';
import getRelatedVideosAction from './related';
import getVideosTagsAction from './tags';
import { videosInitialState } from './types';
import getYoutubeVideoInfoAction from './youtube';

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
            .addCase(getVideosFeedAction.rejected, ActionWrapperRejected)
            // get video tags
            .addCase(getVideosTagsAction.pending, ActionWrapperPending)
            .addCase(getVideosTagsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getVideosTagsAction.rejected, ActionWrapperRejected)
            // get all videos
            .addCase(getAllVideosAction.pending, ActionWrapperPending)
            .addCase(getAllVideosAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllVideosAction.rejected, ActionWrapperRejected)
            // get single youtube video infos
            .addCase(getYoutubeVideoInfoAction.pending, ActionWrapperPending)
            .addCase(getYoutubeVideoInfoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getYoutubeVideoInfoAction.rejected, ActionWrapperRejected)
            // get related videos
            .addCase(getRelatedVideosAction.pending, ActionWrapperPending)
            .addCase(getRelatedVideosAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getRelatedVideosAction.rejected, ActionWrapperRejected)
            // get popular videos
            .addCase(getPopularVideosAction.pending, ActionWrapperPending)
            .addCase(getPopularVideosAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getPopularVideosAction.rejected, ActionWrapperRejected);
    },
});

const videosReducer = videosSlice.reducer;
export default videosReducer;
