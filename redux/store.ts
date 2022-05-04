import { Dispatch } from 'react';
import logger from 'redux-logger';
import { Action, configureStore, EnhancedStore, ThunkAction } from '@reduxjs/toolkit';
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducer, RootState } from './reducers';

const isDevMode = process.env.NODE_ENV === 'development';

const store = configureStore({
    devTools: isDevMode,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

const setupStore = (_ctx?: Context): EnhancedStore => store;
const makeStore: MakeStore<EnhancedStore> = (context: Context) => setupStore(context);

export const wrapper = createWrapper(makeStore, {
    debug: isDevMode,
});

export type AppThunk = ThunkAction<void, RootState, null, Action>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): Dispatch<Action> => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default wrapper;
