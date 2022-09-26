import {
    ActionWrapperReset,
    ActionWrapperPending,
    ActionWrapperFulfilled,
    ActionWrapperRejected,
} from '@constants/redux';
import { createSlice } from '@reduxjs/toolkit';
import getFeaturedArticlesAction from './featured';
import getArticlesTagsAction from './tags';
import { articlesInitialState } from './types';

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: articlesInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // get all featured articles
            .addCase(getFeaturedArticlesAction.pending, ActionWrapperPending)
            .addCase(getFeaturedArticlesAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getFeaturedArticlesAction.rejected, ActionWrapperRejected)
            // get video tags
            .addCase(getArticlesTagsAction.pending, ActionWrapperPending)
            .addCase(getArticlesTagsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getArticlesTagsAction.rejected, ActionWrapperRejected);
    },
});

const articlesReducer = articlesSlice.reducer;
export default articlesReducer;
