import { IUnknownObject } from '@interfaces/app';
import { PayloadAction } from '@reduxjs/toolkit';

export type IBasicInitialState = {
    data: IUnknownObject;
    loading: boolean;
    fetched: boolean;
    error: Error | IUnknownObject | null;
};

export type IBasicInitialStateList = {
    data: IUnknownObject[];
    loading: false;
    fetched: false;
    error: Error | null;
};

export const BasicInitialState: IBasicInitialState = {
    data: {},
    loading: false,
    fetched: false,
    error: null,
};

export const BasicInitialStateList: IBasicInitialStateList = {
    data: [],
    loading: false,
    fetched: false,
    error: null,
};

export const BasicActionPending = (state: IBasicInitialState): void => {
    state.error = null;
    state.loading = true;
    state.fetched = false;
};

export const BasicActionFulfilled = (state: IBasicInitialState, action: PayloadAction<IUnknownObject>): void => {
    state.error = null;
    state.fetched = true;
    state.loading = false;
    state.data = action.payload;
};

export const BasicActionRejected = (state: IBasicInitialState, action: PayloadAction<IUnknownObject>): void => {
    state.loading = false;
    state.fetched = false;
    state.error = action.payload;
};

export const BasicResetAction = (state: IBasicInitialState): void => {
    state.error = null;
    state.fetched = false;
    state.loading = false;
    state.data = {};
};
