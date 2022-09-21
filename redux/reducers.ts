import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import ads from './ads';

export const rootReducer = combineReducers({
    auth,
    user,
    ads,
});

export type IRootState = ReturnType<typeof rootReducer>;
