import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import ads from './ads';
import articles from './articles';

export const rootReducer = combineReducers({
    ads,
    user,
    auth,
    articles,
});

export type IRootState = ReturnType<typeof rootReducer>;
