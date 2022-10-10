import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from '@constants/redux';
import { createSlice } from '@reduxjs/toolkit';
import addArticleBookmarkAction from './add';
import getArticleBookmarksAction from './all';
import { bookmarksInitialState } from './types';
import removeArticleBookmarkAction from './delete';
import getUserBookmarksAction from './userBookmarks';

export const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState: bookmarksInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // bookmark an article
            .addCase(addArticleBookmarkAction.pending, ActionWrapperPending)
            .addCase(addArticleBookmarkAction.fulfilled, ActionWrapperFulfilled)
            .addCase(addArticleBookmarkAction.rejected, ActionWrapperRejected)
            // unbookmark an article
            .addCase(removeArticleBookmarkAction.pending, ActionWrapperPending)
            .addCase(removeArticleBookmarkAction.fulfilled, ActionWrapperFulfilled)
            .addCase(removeArticleBookmarkAction.rejected, ActionWrapperRejected)
            // get all bookmarks for an article
            .addCase(getArticleBookmarksAction.pending, ActionWrapperPending)
            .addCase(getArticleBookmarksAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getArticleBookmarksAction.rejected, ActionWrapperRejected)
            // get all bookmarks by a user
            .addCase(getUserBookmarksAction.pending, ActionWrapperPending)
            .addCase(getUserBookmarksAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getUserBookmarksAction.rejected, ActionWrapperRejected);
    },
});

const bookmarksReducer = bookmarksSlice.reducer;
export default bookmarksReducer;
