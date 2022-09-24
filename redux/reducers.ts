import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import ads from './ads';
import articles from './articles';
import videos from './videos';

export const rootReducer = combineReducers({
    ads,
    user,
    auth,
    videos,
    articles,
});

export type IRootState = ReturnType<typeof rootReducer>;
