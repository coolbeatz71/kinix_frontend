import {
    ActionWrapperReset,
    ActionWrapperPending,
    ActionWrapperFulfilled,
    ActionWrapperRejected,
} from '@constants/redux';
import { createSlice } from '@reduxjs/toolkit';
import getAllAdsAction from './getAll';
import { adsInitialState } from './types';

export const adsSlice = createSlice({
    name: 'ads',
    initialState: adsInitialState,
    reducers: {
        clear: ActionWrapperReset,
    },
    extraReducers: (builder) => {
        builder
            // get all ads
            .addCase(getAllAdsAction.pending, ActionWrapperPending)
            .addCase(getAllAdsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getAllAdsAction.rejected, ActionWrapperRejected);
    },
});

const adsReducer = adsSlice.reducer;
export default adsReducer;
