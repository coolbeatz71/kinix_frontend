import {
    ActionWrapperReset,
    ActionWrapperPending,
    ActionWrapperFulfilled,
    ActionWrapperRejected,
} from '@constants/redux';
import { createSlice } from '@reduxjs/toolkit';
import getFeaturedArticlesAction from './featured';
import getAllArticlesAction from './all';
import getPopularArticlesAction from './popular';
import getRelatedArticlesAction from './related';
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
            .addCase(getArticlesTagsAction.rejected, ActionWrapperRejected)
            // get all articles
            .addCase(getAllArticlesAction.pending, ActionWrapperPending)
            .addCase(getAllArticlesAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllArticlesAction.rejected, ActionWrapperRejected)
            // get popular articles
            .addCase(getPopularArticlesAction.pending, ActionWrapperPending)
            .addCase(getPopularArticlesAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getPopularArticlesAction.rejected, ActionWrapperRejected)
            // get related articles
            .addCase(getRelatedArticlesAction.pending, ActionWrapperPending)
            .addCase(getRelatedArticlesAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getRelatedArticlesAction.rejected, ActionWrapperRejected);
    },
});

const articlesReducer = articlesSlice.reducer;
export default articlesReducer;
