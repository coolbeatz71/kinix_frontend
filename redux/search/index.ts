import {
    ActionWrapperReset,
    ActionWrapperPending,
    ActionWrapperFulfilled,
    ActionWrapperRejected,
} from '@constants/redux';
import { createSlice } from '@reduxjs/toolkit';
import searchContentAction from './all';
import { searchInitialState } from './types';

export const searchSlice = createSlice({
    name: 'search',
    initialState: searchInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // search
            .addCase(searchContentAction.pending, ActionWrapperPending)
            .addCase(searchContentAction.fulfilled, ActionWrapperFulfilled)
            .addCase(searchContentAction.rejected, ActionWrapperRejected);
    },
});

const searchReducer = searchSlice.reducer;
export default searchReducer;
