import { IUnknownObject } from '@interfaces/app';
import { PayloadAction } from '@reduxjs/toolkit';

export type IBasicInitialState = {
    loading: boolean;
    fetched: boolean;
    data: IUnknownObject;
    message: string | null;
    error: Error | IUnknownObject | null;
};

export type IBasicInitialStateList = {
    loading: false;
    fetched: false;
    error: Error | null;
    message: string | null;
    data: IUnknownObject[];
};

export const BasicInitialState: IBasicInitialState = {
    data: {},
    error: null,
    message: null,
    loading: false,
    fetched: false,
};

export const BasicInitialStateList: IBasicInitialStateList = {
    data: [],
    error: null,
    message: null,
    loading: false,
    fetched: false,
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
    state.data = action.payload.data;
    state.message = action.payload.message;
};

export const BasicActionRejected = (state: IBasicInitialState, action: PayloadAction<IUnknownObject>): void => {
    state.loading = false;
    state.fetched = false;
    state.error = action.payload;
};

export const BasicResetAction = (state: IBasicInitialState): void => {
    state.data = {};
    state.error = null;
    state.message = null;
    state.fetched = false;
    state.loading = false;
};

export const ActionWrapperPending = (state: IUnknownObject, action: PayloadAction<unknown>): void => {
    const childStore = action.type.split('/')[1];
    state[childStore].error = null;
    state[childStore].message = null;
    state[childStore].loading = true;
    state[childStore].fetched = false;
};

export const ActionWrapperFulfilled = (state: IUnknownObject, action: PayloadAction<unknown>): void => {
    const childStore = action.type.split('/')[1];
    const payload = action.payload as IUnknownObject;

    state[childStore].error = null;
    state[childStore].fetched = true;
    state[childStore].loading = false;
    state[childStore].data = payload?.data;
    state[childStore].message = payload?.message;
};

export const ActionWrapperRejected = (state: IUnknownObject, action: PayloadAction<unknown>): void => {
    const childStore = action.type.split('/')[1];

    state[childStore].data = null;
    state[childStore].message = null;
    state[childStore].loading = false;
    state[childStore].fetched = false;
    state[childStore].error = action.payload;
};

export const ActionWrapperReset = (state: IUnknownObject, action: PayloadAction<IUnknownObject>): void => {
    const childStore = action?.payload?.context?.split('/')?.[1];

    if (state[childStore]) {
        state[childStore].error = null;
        state[childStore].message = null;
        state[childStore].fetched = false;
        state[childStore].loading = false;
        state[childStore].data = Array.isArray(state[childStore]?.data) ? [] : {};
    }
};
