import { createSlice } from '@reduxjs/toolkit';
import {
    ActionWrapperReset,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperFulfilled,
} from 'constants/redux';
import { authInitialState } from './types';
import loginAction from './login';
import signUpAction from './signup';
import logoutAction from './logout';
import resendOTPAction from './resentOtp';
import confirmAccountAction from './confirm';
import updateAvatarAction from './updateAvatar';
import updateAccountAction from './updateAccount';
import changePasswordAction from './changePassword';
import socialLoginAction from './socialLogin';

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
            .addCase(logoutAction.rejected, ActionWrapperRejected)
            // update avatar
            .addCase(updateAvatarAction.pending, ActionWrapperPending)
            .addCase(updateAvatarAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateAvatarAction.rejected, ActionWrapperRejected)
            // change password
            .addCase(changePasswordAction.pending, ActionWrapperPending)
            .addCase(changePasswordAction.fulfilled, ActionWrapperFulfilled)
            .addCase(changePasswordAction.rejected, ActionWrapperRejected)
            // update account
            .addCase(updateAccountAction.pending, ActionWrapperPending)
            .addCase(updateAccountAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateAccountAction.rejected, ActionWrapperRejected)
            // social login
            .addCase(socialLoginAction.pending, ActionWrapperPending)
            .addCase(socialLoginAction.fulfilled, ActionWrapperFulfilled)
            .addCase(socialLoginAction.rejected, ActionWrapperRejected);
    },
});

const authReducer = authSlice.reducer;
export default authReducer;
