import { createSlice } from '@reduxjs/toolkit';
import loginAction from './login';
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from 'constants/redux';
import { authInitialState } from './types';

export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, ActionWrapperPending)
            .addCase(loginAction.fulfilled, ActionWrapperFulfilled)
            .addCase(loginAction.rejected, ActionWrapperRejected);
        // login
    },
});

const authReducer = authSlice.reducer;
export default authReducer;
