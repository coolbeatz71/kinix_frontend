import { IUnknownObject } from '@interfaces/app';
import { createSlice } from '@reduxjs/toolkit';

export const exampleSlice = createSlice({
    name: 'example',
    initialState: {} as IUnknownObject,
    reducers: {},
});

const exampleReducer = exampleSlice.reducer;
export default exampleReducer;
