import logger from 'redux-logger';
import {
    Action,
    AnyAction,
    CombinedState,
    configureStore,
    Dispatch,
    EnhancedStore,
    ThunkAction,
    ThunkDispatch,
} from '@reduxjs/toolkit';
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { rootReducer, IRootState } from './reducers';
import { useDispatch } from 'react-redux';
import { IUnknownObject } from '@interfaces/app';

const isDevMode = process.env.NODE_ENV === 'development';

type IAppDispatch = ThunkDispatch<CombinedState<IUnknownObject>, undefined, AnyAction> & Dispatch<AnyAction>;

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

export const useAppDispatch = (): IAppDispatch => useDispatch<AppDispatch>();

export default wrapper;
