import logger from 'redux-logger';
import { Action, configureStore, EnhancedStore, ThunkAction } from '@reduxjs/toolkit';
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { rootReducer, IRootState } from './reducers';

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

export type AppThunk = ThunkAction<void, IRootState, null, Action>;
export type AppDispatch = typeof store.dispatch;

export default wrapper;
