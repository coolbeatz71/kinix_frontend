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
import { useDispatch } from 'react-redux';
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { rootReducer, IRootState } from './reducers';
import { IUnknownObject } from '@interfaces/app';
import storage from 'redux-persist/lib/storage';

const isDevMode = process.env.NODE_ENV === 'development';

type IAppDispatch = ThunkDispatch<CombinedState<IUnknownObject>, undefined, AnyAction> & Dispatch<AnyAction>;

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['users'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    devTools: isDevMode,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(logger),
});

const setupStore = (_ctx?: Context): EnhancedStore => store;
const makeStore: MakeStore<EnhancedStore> = (context: Context) => setupStore(context);

export const wrapper = createWrapper(makeStore, {
    debug: isDevMode,
});

export type AppThunk = ThunkAction<void, IRootState, null, Action>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): IAppDispatch => useDispatch<AppDispatch>();
export const persistor = persistStore(store);

export default wrapper;
