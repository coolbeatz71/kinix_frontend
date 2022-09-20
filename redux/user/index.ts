import { createSlice } from '@reduxjs/toolkit';
import getCurrentUserAction from './getCurrentUser';
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from 'constants/redux';
import { userInitialState } from './types';

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        clear: ActionWrapperReset,
        currentUser: ActionWrapperFulfilled,
    },
    extraReducers: (builder) => {
        builder
            // get the current user
            .addCase(getCurrentUserAction.pending, ActionWrapperPending)
            .addCase(getCurrentUserAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getCurrentUserAction.rejected, ActionWrapperRejected);
    },
});

const userReducer = userSlice.reducer;
export default userReducer;
