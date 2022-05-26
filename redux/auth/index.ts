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
        showDialog: (state, { payload }) => {
            state.dialog.context = payload.context;
            state.dialog.isOpen = payload.isOpen;
        },
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
