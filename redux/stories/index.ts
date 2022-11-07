import {
    ActionWrapperReset,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperFulfilled,
} from '@constants/redux';
import { createSlice } from '@reduxjs/toolkit';
import getAllStoryAction from './all';
import { storyInitialState } from './types';

export const storySlice = createSlice({
    name: 'story',
    initialState: storyInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // get all story
            .addCase(getAllStoryAction.pending, ActionWrapperPending)
            .addCase(getAllStoryAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllStoryAction.rejected, ActionWrapperRejected);
    },
});

const storyReducer = storySlice.reducer;
export default storyReducer;
