import { createSlice } from '@reduxjs/toolkit';
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from '@constants/redux';
import addVideoRatingAction from './add';
import { videoRatingInitialState } from './types';
import getSingleVideoRateSummaryAction from './summary';
import getSingleVideoRatedByUserAction from './single';
import getRatesByUserAction from './userRates';

export const ratingsSlice = createSlice({
    name: 'ratings',
    initialState: videoRatingInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // add ratings to a video
            .addCase(addVideoRatingAction.pending, ActionWrapperPending)
            .addCase(addVideoRatingAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addVideoRatingAction.rejected, ActionWrapperRejected)
            // get ratings by an user for a specific video
            .addCase(getSingleVideoRatedByUserAction.pending, ActionWrapperPending)
            .addCase(getSingleVideoRatedByUserAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getSingleVideoRatedByUserAction.rejected, ActionWrapperRejected)
            // get rating summary for a single video
            .addCase(getSingleVideoRateSummaryAction.pending, ActionWrapperPending)
            .addCase(getSingleVideoRateSummaryAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getSingleVideoRateSummaryAction.rejected, ActionWrapperRejected)
            // get all ratings by a user
            .addCase(getRatesByUserAction.pending, ActionWrapperPending)
            .addCase(getRatesByUserAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getRatesByUserAction.rejected, ActionWrapperRejected);
    },
});

const ratingsReducer = ratingsSlice.reducer;
export default ratingsReducer;
