import { createSlice } from '@reduxjs/toolkit';
import loginAction from './login';
import signUpAction from './signup';
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
} from 'constants/redux';
import { authInitialState } from './types';
import confirmAccountAction from './confirm';
import resendOTPAction from './resentOtp';
import logoutAction from './logout';

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
            // login
            .addCase(loginAction.pending, ActionWrapperPending)
            .addCase(loginAction.fulfilled, ActionWrapperFulfilled)
            .addCase(loginAction.rejected, ActionWrapperRejected)
            // sign up
            .addCase(signUpAction.pending, ActionWrapperPending)
            .addCase(signUpAction.fulfilled, ActionWrapperFulfilled)
            .addCase(signUpAction.rejected, ActionWrapperRejected)
            // confirm account
            .addCase(confirmAccountAction.pending, ActionWrapperPending)
            .addCase(confirmAccountAction.fulfilled, ActionWrapperFulfilled)
            .addCase(confirmAccountAction.rejected, ActionWrapperRejected)
            // resend verification code
            .addCase(resendOTPAction.pending, ActionWrapperPending)
            .addCase(resendOTPAction.fulfilled, ActionWrapperFulfilled)
            .addCase(resendOTPAction.rejected, ActionWrapperRejected)
            // logout user
            .addCase(logoutAction.pending, ActionWrapperPending)
            .addCase(logoutAction.fulfilled, ActionWrapperFulfilled)
            .addCase(logoutAction.rejected, ActionWrapperRejected);
    },
});

const authReducer = authSlice.reducer;
export default authReducer;
